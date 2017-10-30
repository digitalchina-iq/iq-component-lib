import { Pipe, PipeTransform } from '@angular/core';
import { IqNum2ChinesePipe } from './iq-num-chinese.pipe';

@Pipe({
  name: 'iqChinaCurrency'
})
export class IqChinaCurrencyPipe extends IqNum2ChinesePipe {
  constructor() {
    super();
  }

  transform(value: number, expression: string = '壹'): string {
    let num = Number(value);

    if(isNaN(num)){return 'NaN'}

    this.expression = expression;
    this.CHINESE_NUM_ARR = expression === '壹' ? this.CHINESE_NUM_UP : this.CHINESE_NUM_LOW;
    this.UNIT_ARR = expression === '壹' ? this.UNIT_UP : this.UNIT_LOW;

    let [_int='0', _float=''] = Math.abs(num).toString().split('.');

    let floatArr = new Array();
    let float = _float.split('').slice(0,3), floatUnit = ['角','分','厘'];
    float.forEach((v,i) => {
      if(v !== '0') {
        floatArr.push(super.transformFloat(v) + (floatUnit[i]||''));
      }
    });

    return super.transformInt(_int) + '元' + (!_float ? '整' : floatArr.join(''));
  }
}
