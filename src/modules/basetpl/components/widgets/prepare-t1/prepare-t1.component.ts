import { Component, OnInit } from '@angular/core'

declare var $: any;
// import { Component, OnInit,ViewChild, ViewChildren} from '@angular/core';
// import 'highlight.js/styles/googlecode.css'

@Component({
  templateUrl: './prepare-t1.component.html'
})

export class PrepareT1Component implements OnInit {
  fromSwitcher = true;
  fromSwitcher2 = 'a';
  
  ngOnInit() {
    $("#wizard").bwizard();
  }
}
