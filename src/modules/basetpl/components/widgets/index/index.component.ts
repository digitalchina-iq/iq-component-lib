import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { flyIn } from 'animations/fly-in';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { single, multi, single1 } from './data';

// 引入 echarts 主模块。
/*import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/scatter';*/

declare var $: any;

@Component({
  templateUrl: './index.component.html',
  animations: [
    flyIn
  ],
  styles: [`

    .widget-content {
      line-height: 36px;
    }

  `]
})

export class IndexComponent implements OnInit {

  chart: any;
  single: any[];
  single1: any[];
  multi: any[];

  view: any[] = [450, 300];
  view1: any[] = [1000, 400];
  // options
  gradient: any;

  colorScheme = {
    domain: ['#618fb0', 'pink', '#C7B42C']
  };
  colorScheme1 = {
    domain: ['green', 'red', '#C7B42C', 'pink' , '#618fb0']
  };

  //@ViewChild('wrapper') wrapper: ElementRef;

  constructor() {
    Object.assign(this, {single,single1,multi});
    //  Object.assign(this, {single1, multi})
  }

  onSelect(event) {
    console.log(event);
  }


  ngOnInit() {
    console.log(single);
    /*this.chart = echarts.init(this.wrapper.nativeElement);
    this.chart.setOption*/
  }

}
