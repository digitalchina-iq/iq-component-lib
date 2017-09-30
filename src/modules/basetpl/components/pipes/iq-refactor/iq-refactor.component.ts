import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-refactor.component.html',
  animations: [
    flyIn
  ]
})
export class IqRefactorDemoComponent {

  constructor(){}

}
