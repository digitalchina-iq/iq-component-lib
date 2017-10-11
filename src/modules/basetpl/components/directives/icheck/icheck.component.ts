import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './icheck.component.html',
  animations: [
    flyIn
  ]
})

export class IcheckDemoComponent {

  constructor(){}

}
