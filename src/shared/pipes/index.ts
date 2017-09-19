import { iqRefactorPipe } from './iq-refactor.pipe';
import { iqArrayRefactorPipe } from './iq-array-refactor.pipe';
import { iqGenderPipe } from './iq-gender.pipe';

export { iqRefactorPipe,iqArrayRefactorPipe,iqGenderPipe };
export let SHARED_PIPES = [iqRefactorPipe,iqArrayRefactorPipe,iqGenderPipe];
