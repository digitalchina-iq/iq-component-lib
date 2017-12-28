/**
 *星级评定组件
 *author 李晨 - 2017-12-28
 */

import { Component, OnInit, forwardRef, Input, Output, ViewContainerRef } from '@angular/core';
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

  @Input() max: number;//星星数量
  @Input() titles: string[];//星星标题
  @Input() customTemplate: ViewContainerRef;//

  constructor() {}

  ngOnInit() {}

  writeValue() {}

  registerOnChange(fn) {}

  registerOnTouched(fn) {}

  setDisabledState(isDisabled: boolean) {}
}