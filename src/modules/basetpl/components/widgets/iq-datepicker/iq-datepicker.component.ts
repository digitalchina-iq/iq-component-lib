import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-datepicker.component.html',
  animations: [
    flyIn
  ]
})

export class IqDatepickerDemoComponent {
  startDate: Date;
  endDate: Date;
  isSubmit: boolean = false;

  date: any[]=[];

  someDate: Date;

  submitSomething() {
    this.isSubmit = true;
  }

  reset() {
    this.someDate = undefined;
    this.isSubmit = false;
  }

}
