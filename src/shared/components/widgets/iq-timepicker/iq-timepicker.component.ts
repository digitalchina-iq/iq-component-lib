import { Component, OnInit, ViewChild, Input, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

declare var window;

/**时间选择组件*/
@Component({
  selector: 'iq-timepicker',
  templateUrl: './iq-timepicker.component.html',
  styleUrls: ['./iq-timepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IqTimePickerComponent),
    multi: true
  }]
})
export class IqTimePickerComponent implements OnInit, ControlValueAccessor{
  
  now = moment();
  timeArr: string[];
  hourList: string[] = this.getArr(0, 23);
  minuteList: string[] = this.getArr(0, 59);
  secondList: string[] = this.getArr(0, 59);
  bindTime: string = '';
  show: boolean = false;
  time: Moment;
  isDisabled: boolean = false;

  startPoint: string;
  endPoint: string;

  private onChangeCallBack: Function;
  private momentValid: boolean;
  /**取消监听事件*/
  removeListen(): void{};

  @Input() set startTime(v) {
    if(!v && v !== 0){return};
    this.startPoint = moment(Number(v)).isValid() ? moment(v).format('HH:mm:ss') : v;
    let _this = this;
    setTimeout(function(){
      _this.checkTimeRange();
    })
  };
  @Input() set endTime(v) {
    if(!v && v !== 0){return};
    this.endPoint = moment(Number(v)).isValid() ? moment(v).format('HH:mm:ss') : v;
    let _this = this;
    setTimeout(function(){
      _this.checkTimeRange();
    })
  };
  @Input() defaultTime: string;
  @Input() placeHolder: string = '';
  @Input() required: boolean = false;
  @Input() format: string;
  @ViewChild('iqTimePicker') iqTimePicker: ElementRef;

  constructor(private render: Renderer2) {}

  checkTimeRange() {
    let start = this.startPoint ? this.startPoint.split(":").map(item => Number(item)) : [0,0,0],
        end = this.endPoint ? this.endPoint.split(":").map(item => Number(item)) : [23,59,59],
        tmpArr = this.timeArr.map(item => Number(item));

    this.hourList = this.getArr(start[0], end[0]);

    if(tmpArr[0] < start[0]){
      this.timeArr[0] = this.addZeroToArrItem([start[0]])[0];
    }

    if(tmpArr[0] > end[0]){
      this.timeArr[0] = this.addZeroToArrItem([end[0]])[0];
    }

    if(tmpArr[0] === start[0]){
      this.minuteList = this.getArr(start[1], 59);

      if(tmpArr[1] < start[1]){
        this.timeArr[1] = this.addZeroToArrItem([start[1]])[0];
      }

      if(tmpArr[1] === start[1] || Number(this.timeArr[1]) === start[1]){
        this.secondList = this.getArr(start[2], 59);

        if(tmpArr[2] < start[2]) {
          this.timeArr[2] = this.addZeroToArrItem([start[2]])[0];
        }

      }else{
        this.secondList = this.getArr(0, 59);
      }

    } else if(tmpArr[0] === end[0]) {
      this.minuteList = this.getArr(0, end[1]);

      if(tmpArr[1] > end[1]){
        this.timeArr[1] = this.addZeroToArrItem([end[1]])[0];
      }

      if(tmpArr[1] === end[1]  || Number(this.timeArr[1]) === end[1]){
        this.secondList = this.getArr(0, end[2]);

        if(tmpArr[2] > end[2]) {
          this.timeArr[2] = this.addZeroToArrItem([end[2]])[0];
        }

      }else{
        this.secondList = this.getArr(0, 59);
      }
    } else {
      this.minuteList = this.getArr(0, 59);
      this.secondList = this.getArr(0, 59);
    }

  }

  ngOnInit() {
    if(this.defaultTime) {
      this.timeArr = this.defaultTime.split(":");
    } else {
      this.timeArr = this.addZeroToArrItem([this.now.hour(), this.now.minute(), 0]);
    }
  }

  addZeroToArrItem(arr: number[]) {
    return arr.map(n => n < 10 ? '0' + n : '' + n);
  }

  getArr(start, end) {
    return this.addZeroToArrItem(Array.from({length: end - start + 1}).map((v,i) => i + start));
  }

  writeValue(value: string|Date|number) {
    if(!value){return}

    this.time = moment(value);
    if(!this.time.isValid() && typeof value === 'string'){
      this.momentValid = false;
      this.bindTime = value;
      this.timeArr = value.split(':');
    }else{
      this.momentValid = true
      this.bindTime = this.time.format('HH:mm:ss');
      this.timeArr = this.addZeroToArrItem([this.time.hour(), this.time.minute(), this.time.second()]);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  registerOnChange(fn) {
    this.onChangeCallBack = fn;
  }

  registerOnTouched() {}

  showPicker() {
    if(this.isDisabled){return};

    this.show = true;

    this.removeListen();
    let datePickerElement = this.iqTimePicker.nativeElement;
    this.removeListen = this.render.listen(window, 'click', (e) => {
      if(e.target != datePickerElement && !datePickerElement.contains(e.target)) {
        this.hidePicker();
      }
    });
  }

  hidePicker() {
    this.show = false;
    this.removeListen();
  }

  getTime() {
    if(this.startPoint || this.endPoint) {
      this.checkTimeRange();
    }

    this.bindTime = this.timeArr.join(":");
    let getDateTime = (time: Moment) => {
      return time.set({
        hour: Number(this.timeArr[0]),
        minute: Number(this.timeArr[1]),
        second: Number(this.timeArr[2])
      });
    }
    if(this.momentValid) {
      let t = getDateTime(this.time);
      this.onChangeCallBack(this.format ? t.format(this.format) : t.toDate());
    }else{
      let t = getDateTime(moment());
      this.onChangeCallBack(this.format ? t.format(this.format) : this.bindTime);
    }
  }
}