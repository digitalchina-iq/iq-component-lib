import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-timepicker.component.html',
  animations: [
    flyIn
  ]
})

export class IqTimepickerDemoComponent {

  time = []

  bindTime: string;
  
  constructor(){}

}
