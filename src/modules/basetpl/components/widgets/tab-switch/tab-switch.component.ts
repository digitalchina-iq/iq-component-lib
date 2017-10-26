import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: 'tab-switch.component.html',
  styleUrls: ['tab-switch.component.scss'],
  animations: [
    flyIn
  ]
})

export class TabSwitchDemoComponent implements OnInit {

  tabList: {id:string,name: string}[] = [{name:'abc',id: 'abc'},{name:'def',id: 'def'},{name:'ghi',id: 'ghi'}];
  contList: {id:string,content: string}[] = [{content:'abc',id: 'abc'},{content:'def',id: 'def'},{content:'ghi',id: 'ghi'}];
  count: number = 0;

  constructor() {}

  ngOnInit() {
  }

  deleteItem(i) {
    this.tabList.splice(i,1);
    this.contList.splice(i,1);
  }

  addItem() {
    this.count++;
    this.tabList.push({name: `newTab${this.count}`, id: `newId${this.count}`});
    this.contList.push({content: `newContent${this.count}`, id: `newId${this.count}`});
  }

}
