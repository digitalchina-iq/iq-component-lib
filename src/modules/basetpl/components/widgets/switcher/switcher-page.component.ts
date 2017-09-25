import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: 'switcher-page.component.html',
  animations: [
    flyIn
  ]
})

export class IqSwitcherPageDemoComponent implements OnInit {
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
