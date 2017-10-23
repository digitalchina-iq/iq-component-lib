import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './trim.component.html',
  animations: [
    flyIn
  ]
})

export class TrimDemoComponent {

  constructor(){}

}
