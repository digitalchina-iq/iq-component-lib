import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-select.component.html',
  animations: [
    flyIn
  ]
})

export class IqSelectDemoComponent {

  constructor(){}

}
