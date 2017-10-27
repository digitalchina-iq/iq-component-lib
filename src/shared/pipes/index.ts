import { iqRefactorPipe } from './iq-refactor.pipe';
import { iqArrayRefactorPipe } from './iq-array-refactor.pipe';
import { iqGenderPipe } from './iq-gender.pipe';
import { IqFileSizePipe } from './iq-filesize.pipe';
import { IqDatePipe } from './iq-date.pipe';
import { IqNum2ChinesePipe } from './iq-num-chinese.pipe';
import { IqChinaCurrencyPipe } from './iq-china-currency.pipe';


export { iqRefactorPipe,iqArrayRefactorPipe,iqGenderPipe,IqFileSizePipe,IqDatePipe,IqNum2ChinesePipe,IqChinaCurrencyPipe };
export let SHARED_PIPES = [iqRefactorPipe,iqArrayRefactorPipe,iqGenderPipe,IqFileSizePipe,IqDatePipe,IqNum2ChinesePipe,IqChinaCurrencyPipe];
