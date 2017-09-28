import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: 'window.component.html',
  animations: [
    flyIn
  ]
})

export class WindowDemoComponent implements OnInit {
  //
  // constructor(private av: AV) { }

  fromSwitcher = 'aaa';
  fromSwitcher2 = 'bbb';
  modelChangeText ='';

  modelChange(e){
    this.modelChangeText="改变---"+e;
  }

  ngOnInit() {

  }

}
