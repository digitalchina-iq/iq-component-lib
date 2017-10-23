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

  constructor() {}

  ngOnInit() {

  }

}
