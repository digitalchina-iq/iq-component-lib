import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'switcher-page.component.html'
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
