import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
  animations: [
    flyIn
  ]
})

export class PrintComponent {
  a;
  b;
  c;

  constructor(){}
  print(){
    window.print(); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需要 
  }
}
