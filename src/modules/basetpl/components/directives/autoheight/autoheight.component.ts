import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './autoheight.component.html',
  animations: [
    flyIn
  ]
})

export class AutoheightDemoComponent {

  constructor(){}

}
