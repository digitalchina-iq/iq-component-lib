import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
    selector: 'showcode',
    templateUrl: 'showcode.component.html',
    styleUrls: ['showcode.component.scss'],
    animations: [
      trigger('vani', [
        transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateX(3%)'
          }),
          animate('.5s ease-in')
        ]),
        transition('* => void', [
          animate('.5s .1s ease-out', style({
            opacity: 0,
            transform: 'translateX(3%)'
          }))
        ])
      ])
    ]
})

export class ShowcodeComponent {

  public show: boolean = false;

}
