import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-datepicker.component.html',
  animations: [
    flyIn
  ]
})

export class IqDatepickerDemoComponent {

  date: any[]=[];

}
