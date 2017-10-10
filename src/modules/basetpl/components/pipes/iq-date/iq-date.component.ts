import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-date.component.html',
  animations: [
    flyIn
  ]
})
export class IqDatePipeComponent {

  constructor(){}

}
