import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';
import { WindowService } from "core/services";

@Component({
  templateUrl: 'window.component.html',
  animations: [
    flyIn
  ]
})

export class WindowDemoComponent implements OnInit {
  //
  // constructor(private av: AV) { }

  constructor(private windowservice: WindowService) { };

  fromSwitcher = 'aaa';
  fromSwitcher2 = 'bbb';
  modelChangeText ='';

  modelChange(e){
    this.modelChangeText="改变---"+e;
  }

  ngOnInit() {
    // this.windowservice.alert({title:"ads",message:"填写的信息",type:"fail"})
    // this.windowservice.confirm({message:"填写的信息"})
      //
      // this.windowservice.confirm({message:"填写的信息",type:"alert"})
  }

  testalerts() {
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"success",timer:"3000"})
  }

  testalertf() {
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"fail"})
  }

  testalertw() {
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"warn"})
  }

  testconfirm() {
    this.windowservice.confirm({message:"填写的信息"})
  }

}
