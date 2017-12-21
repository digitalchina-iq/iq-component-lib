import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './log.component.html',
  animations: [
    flyIn
  ]
})

export class LogComponent {
  a;
  b;
  c;

  constructor(){}

}
