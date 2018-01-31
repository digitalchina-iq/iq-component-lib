import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: 'iq-person-select.component.html',
  animations: [
    flyIn
  ]
})

export class IqPersonSelectDemoComponent implements OnInit {
  one: any;
  two: any;
  three: any;
  four: any;
  list: any[];
  
  ngOnInit() {

  }

  doSomething(e){
    console.log(e);
  }
}
