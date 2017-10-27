import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-num-chinese.component.html',
  animations: [
    flyIn
  ]
})
export class IqNum2ChinesePipeComponent {
  num: number = 1024;
  num2: number = 1024;
  constructor(){}

}
