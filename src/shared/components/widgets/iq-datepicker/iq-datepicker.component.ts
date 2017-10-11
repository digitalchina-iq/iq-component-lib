import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

declare var window;

@Component({
    selector:'iq-datepicker',
    templateUrl: 'iq-datepicker.component.html',
    styleUrls: ['iq-datepicker.component.scss'],
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IqDatePickerComponent),
      multi: true
    }]
})
export class IqDatePickerComponent implements ControlValueAccessor,OnInit {

  today: Moment = moment();//用于设置默认选择今天

  year: number = this.today.year();
  month: number = this.today.month();
  day: any = this.today.date();//选择高亮的day
  _day: any = '';//暂存被选择的day

  choosedDate: string = "";//显示选择的日期
  startday: any;//开始日期
  endday: any;//结束日期
  disabledStartDate: any = 0;//小于开始日期不能被选择
  disabledEndDate: any = 32;//大于开始结束不能被选择
  disabledPrevMonth: boolean = false;//禁用上个月
  disabledNextMonth: boolean = false;//禁用下个月
  bindDate: any;//双向绑定的日期

  yearList: number[] = [];//年份列表
  monthList: number[] = [];//月份列表

  prevMonth: number[] = [];//前一个月
  currentMonth: number[] = [];//当前月
  nextMonth: number[] = [];//下个月

  show: boolean = false;//日期组件展示与否
  onChangeCallback: any;
  onTouchedCallback: any;
  isDisabled: boolean = false;//组件被禁用状态
  /**取消监听事件*/
  removeListen(): void{};

  @Input() minYear: number = this.today.year() - 80;//默认最小年份
  @Input() maxYear: number = this.today.year() + 20;//默认最大年份
  @Input() placeHolder = "";
  @Input() required: boolean = false;//必填
  @Input() format: string;
  @Input() set startDate(v){
    if(!v){
      this.disabledStartDate = 0;
      this.startday = undefined;
      this.reset();
    }else{
      this.startday = new Date(v);
      this.checkStartDate();
    }
  };//起始日期

  @Input() set endDate(v){
    if(!v){
      this.disabledEndDate = 32;
      this.endday = undefined;
      this.reset();
    }else{
      this.endday = new Date(v);
      this.checkEndDate();
    }
  };//结束日期

  @ViewChild("iqDatePicker") iqDatePicker: ElementRef;

  constructor(private renderer: Renderer2) {}

  reset(){
    this.year = this.today.year();
    this.month = this.today.month();
  }

  checkStartDate(){//检查小于开始日期被禁用
    let _y = this.startday.getFullYear(),
        _m = this.startday.getMonth();


    if(this.year == _y){
      if(this.month == _m){
        this.disabledStartDate = this.startday.getDate();
      }else if(this.month > _m){
        this.disabledStartDate = 0;
      }else{
        this.disabledStartDate = 32;
      }
    }else if(this.year > _y){
      this.disabledStartDate = 0;
    }else{
      this.disabledStartDate = 32;
    }
  }

  checkEndDate(){//检查大于结束日期被禁用
    let _y = this.endday.getFullYear(),
        _m = this.endday.getMonth();


    if(this.year == _y){
      if(this.month == _m){
        this.disabledEndDate = this.endday.getDate();
      }else if(this.month > _m){
        this.disabledEndDate = 0;
      }else{
        this.disabledEndDate = 32;
      }
    }else if(this.year > _y){
      this.disabledEndDate = 0;
    }else{
      this.disabledEndDate = 32;
    }
  }

  addZero(n): string{//单位数添加0
    return Number(n) < 10 ? '0' + n : '' + n;
  }

  /**获取连续数组*/
  getArr(start: number, end: number): number[]{
    return Array.from({length: end - start + 1}).map((v,i) => Number(i) + Number(start));
  }

  writeValue(value: any){
    if(!value){
      this.bindDate = "";
      this.choosedDate = "";
      this.reset();
    }else{
      this.bindDate = new Date(value);
      let tmp = moment(value);

      this._day = tmp.date();//暂存当前存入的day
      this.year = tmp.year();
      this.month = tmp.month();
      
      this.choosedDate = tmp.format('YYYY-MM-DD');
    }
    
    this.getDate(this.year, this.month);
  }

  setDisabledState(isDisabled: boolean){
    this.isDisabled = isDisabled;
  }

  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  ngOnInit(){
    
    this.yearList = this.getArr(this.minYear, this.maxYear);//获取年份列表

    this.monthList = this.getArr(0, 11);//获取月份列表

  }

  ngOnDestroy() {
    this.removeListen();
  }

  /**打开选日期框，监听点击事件*/
  showPicker() {
    if(this.isDisabled){return};

    this.show = true;

    this.removeListen();
    let datePickerElement = this.iqDatePicker.nativeElement;
    this.removeListen = this.renderer.listen(window, 'click', (e) => {
      if(e.target != datePickerElement && !datePickerElement.contains(e.target)) {
        this.hidePicker();
      }
    });
  }

  /**关闭选日期框，并取消事件监听*/
  hidePicker() {
    this.show = false;
    this.removeListen();
  }

  //根据年份月份获得日期
  getDate(year, month){
    if(this.startday){
      this.checkStartDate();
    }
    if(this.endday){
      this.checkEndDate();
    }

    this.prevMonth.length = 0;
    this.currentMonth.length = 0;
    this.nextMonth.length = 0;

    let tmpday = moment();
    let currentday = moment();

    tmpday.set({year: year, month: month});

    currentday.set({year: year, month: month});

    let prev = tmpday.set('date', 0);
    let prevMonthMax = prev.date(),//上个月最大日期
        prevMonthLen = prev.day();//上一个月长度

    this.prevMonth = this.getArr(prevMonthMax - prevMonthLen + 1, prevMonthMax);

    let monthLen = currentday.daysInMonth();

    this.currentMonth = this.getArr(1, monthLen);

    this.nextMonth = this.getArr(1, 42 - prevMonthLen - monthLen)

    if(this.bindDate){
      this.day = this.bindDate.getFullYear() == this.year && this.bindDate.getMonth() == this.month ? this._day : "";
    }else{
      this.day = "";
    }
  }

  //选择日期
  chooseDate(i){
    if((!!this.startday && i < this.disabledStartDate) || (!!this.endday && i > this.disabledEndDate))return;
    this.day = i;
    this._day = this.day;
    this.choosedDate = `${this.year}-${this.addZero(Number(this.month) + 1)}-${this.addZero(this.day)}`;
    this.bindDate = new Date(this.year, this.month, this.day);
    this.hidePicker();
    this.onChangeCallback(this.format ? moment(this.bindDate).format(this.format) : this.bindDate);
  }

  //去上个月
  toPrevMonth(i?){
    if(!!this.startday){
      if(this.startday.getFullYear() - this.year > 0 || (this.startday.getFullYear() - this.year == 0  && this.startday.getMonth() - this.month >= 0)){
        this.disabledPrevMonth = true;
        return;
      }else{
        this.disabledPrevMonth = false;
      }
    };
    if(this.year <= this.minYear && this.month == 0){//如果超出时间范围无效
      window.alert('超出最小时间范围');
      return false;
    }
    if(this.month == 0){
      this.year -= 1;
      this.month = 11;
    }else{
      this.month -= 1;
    }
    this.getDate(this.year, this.month);
    if(!!i){this.chooseDate(i);}
  }

  //去下个月
  toNextMonth(i?){
    if(!!this.endday){
      if(this.endday.getFullYear() - this.year < 0 || (this.endday.getFullYear() - this.year == 0 && this.endday.getMonth() - this.month <= 0)){
        this.disabledNextMonth = true;
        return;
      }else{
        this.disabledNextMonth = false;
      }
    };
    if(this.year >= this.maxYear && this.month == 11){//如果超出时间范围无效
      window.alert('超出最大时间范围');
      return false;
    }
    if(this.month == 11){
      this.year += 1;
      this.month = 0;
    }else{
      this.month += 1;
    }
    this.getDate(this.year, this.month);
    if(!!i){this.chooseDate(i)};
  }
}