import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './print.component.html',
  animations: [
    flyIn
  ]
})

export class PrintComponent {
  a;
  b;
  c;

  constructor(){}

}
