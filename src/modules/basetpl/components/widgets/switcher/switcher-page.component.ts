import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'switcher-page.component.html'
})
export class IqSwitcherPageDemoComponent implements OnInit {

  fromSwitcher = 'aaa';
  fromSwitcher2 = 'bbb';
  modelChangeText ='';
  ngOnInit() {

  }

  modelChange(e){
    this.modelChangeText="改变---"+e;
  }

}
