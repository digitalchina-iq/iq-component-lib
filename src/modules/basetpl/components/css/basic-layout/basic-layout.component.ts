import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './basic-layout.component.html',
  animations: [
    flyIn
  ]
})

export class BasicLayoutComponent {
  a;
  b;
  c;

  constructor(){}

}
