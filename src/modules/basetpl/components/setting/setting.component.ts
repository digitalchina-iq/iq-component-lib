import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './setting.component.html',
  animations: [
    flyIn
  ]
})

export class SettingComponent {
  a;
  b;
  c;

  constructor(){}

}
