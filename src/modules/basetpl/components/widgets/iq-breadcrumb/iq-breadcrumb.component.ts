import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-breadcrumb.component.html',
  animations: [
    flyIn
  ]
})

export class IqBreadcrumbDemoComponent {

  constructor(){}

}
