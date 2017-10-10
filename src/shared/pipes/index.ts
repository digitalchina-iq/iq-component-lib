import { iqRefactorPipe } from './iq-refactor.pipe';
import { iqArrayRefactorPipe } from './iq-array-refactor.pipe';
import { iqGenderPipe } from './iq-gender.pipe';
import { IqFileSizePipe } from './iq-filesize.pipe';
import { IqDatePipe } from './iq-date.pipe';

export { iqRefactorPipe,iqArrayRefactorPipe,iqGenderPipe,IqFileSizePipe,IqDatePipe };
export let SHARED_PIPES = [iqRefactorPipe,iqArrayRefactorPipe,iqGenderPipe,IqFileSizePipe,IqDatePipe];
