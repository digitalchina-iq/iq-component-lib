import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'switcher-page.component.html'
})
export class IqSwitcherPageDemoComponent implements OnInit {

  fromSwitcher = 'aaa';

  ngOnInit() {

  }

  modelChange(e){
    console.log("+++++");
    console.log(e);
    console.log("+++++");
  }

  // mm(e){
  //   console.log("mm---"+this.fromSwitcher2);
  //   console.log("mm---"+e);
  // }

}
