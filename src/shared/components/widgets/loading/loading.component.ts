import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: 'loading.component.html',
  styleUrls:["loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  constructor() {  }

  _show = true;
  @Input("style")
  style = {};

  @Input("show")
  set show(show){
    this._show = show;
  }
  get show(){
    return this._show;
  }

  //加载效果类型，目前六种：circle1,circle2,square1,round1,round2,various1
  @Input() type: string = 'circle1';
  
  ngOnInit() {}
}
