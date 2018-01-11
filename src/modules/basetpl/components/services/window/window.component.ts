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
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"success"})
  }

  testalertf() {
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"fail"})
  }

  testalertw() {
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"warn"})
  }

  testalertn() {
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"success"}, {autoClose: false})
  }

  testalertc() {
    this.windowservice.alert({title:"标题",message:"填写的信息",type:"success"}, {closeTime: 1000})
  }

  testalertd() {
    this.windowservice.alert({title:"标题",message:"#{5}秒后关闭",type:"success"})
  }

  testconfirm() {
    this.windowservice.confirm({message:"填写的信息"})
  }

  testprompt() {
    this.windowservice.prompt({message: '填写的信息'});
  }

}
