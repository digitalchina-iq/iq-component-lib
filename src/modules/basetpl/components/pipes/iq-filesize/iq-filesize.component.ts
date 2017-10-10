import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-filesize.component.html',
  animations: [
    flyIn
  ]
})
export class IqFileSizePipeComponent {

  constructor(){}

}
