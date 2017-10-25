import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './stop-parent-click.component.html',
  styleUrls: ['./stop-parent-click.component.scss'],
  animations: [
    flyIn
  ]
})
export class StopParentClickDemoComponent {

  constructor(){}

  eventList: string[] = [];

  parentClick() {
    this.eventList.push('父级事件被触发了');
    setTimeout(()=>{this.eventList.shift()}, 2000);
  }

  childClick() {
    this.eventList.push('子级事件被触发了');
    setTimeout(()=>{this.eventList.shift()}, 2000);
  }

}
