import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './drag.component.html',
  animations: [
    flyIn
  ]
})

export class DragDemoComponent {
  stop: boolean;
  
  constructor(){}

  start(e){
    console.log(e)
  }
  move(e){
    console.log(e)
  }
  end(e){
    console.log(e)
  }


}
