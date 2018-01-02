/**
 *星级评定组件
 *author 李晨 - 2017-12-28
 */

import { Component, OnInit, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'iq-star-rating',
  templateUrl: './star-rating.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IqStarRatingComponent),
    multi: true
  }]
})
export class IqStarRatingComponent implements OnInit, ControlValueAccessor {

  value: number = 0;
  _value: number = 0;
  isDisabled: boolean;
  private onChange: any;
  private onTouched: any;

  @Input() max: number = 5;//星星数量
  @Input() titles: string[] = [];//星星标题
  @Input() customTemplate: TemplateRef<any>;//星星模板
  @Input() style: any;//星星样式

  constructor() {}

  ngOnInit() {
    const DEFAULT_TITLES = Array.from({length: this.max}).map((v,i) => String(i+1));
    this.titles = DEFAULT_TITLES.map((v,i) => this.titles[i] || v);
  }

  writeValue(v) {
    if(v === undefined){
      this.value = this._value = 0;
    } else {
      this.value = this._value = Number(v);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  setValue(i: number) {
    if(this.isDisabled){return}
    this.value = this._value = i + 1;
    this.onChange(i+1);
  }
}