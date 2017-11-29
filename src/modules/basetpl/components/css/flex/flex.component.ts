import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './flex.component.html',
  animations: [
    flyIn
  ]
})

export class FlexComponent {
  a;
  b;
  c;

  constructor(){}

}
