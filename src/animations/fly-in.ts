import { trigger, state, style, transition, animate,keyframes } from '@angular/core';

export const flyIn = trigger('flyIn', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
       animate(500, keyframes([
        style({opacity: 0, transform: 'translateX(100px)', offset: 0}),
        style({opacity: .5, transform: 'translateX(50px)',  offset: 0.5}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
  ]),
  transition('* => void', [
        animate(500, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: .5, transform: 'translateX(50px)', offset: 0.5}),
        style({opacity: 0, transform: 'translateX(100px)',  offset: 1.0})
      ]))
  ])
]);
