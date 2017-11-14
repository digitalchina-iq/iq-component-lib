import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './ie-compatibility.component.html',
  animations: [
    flyIn
  ]
})

export class IeCompatibilityComponent {
  a;
  b;
  c;

  constructor(){}

}
