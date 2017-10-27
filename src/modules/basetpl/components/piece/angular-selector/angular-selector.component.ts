import { Component } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './angular-selector.component.html',
  styleUrls: ['./angular-selector.component.scss'],
  animations: [
    flyIn
  ]
})
export class AngularSelectorComponent {
  fromSwitcher: boolean;
}