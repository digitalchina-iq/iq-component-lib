import { Component } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './obj.component.html',
  animations: [
    flyIn
  ]
})
export class ObjJsComponent {
  copyObj(obj: object) {
    //return JSON.parse(JSON.stringify(obj));
    return Object.assign(obj instanceof Array ? [] : {}, obj);
  }
}