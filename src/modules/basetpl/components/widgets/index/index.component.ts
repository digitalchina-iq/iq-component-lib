import { Component, OnInit } from '@angular/core'
import { flyIn } from 'animations/fly-in';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { single, multi, single1 } from './data';

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

  // single: any[];
  // multi: any[];
  //
  // view: any[] = [700, 400];
  //
  // // options
  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showLegend = true;
  // showXAxisLabel = true;
  // xAxisLabel = 'Country';
  // showYAxisLabel = true;
  // yAxisLabel = 'Population';
  //
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  //
  // constructor() {
  //   Object.assign(this, {single, multi})
  // }
  //
  // onSelect(event) {
  //   console.log(event);
  // }

  single: any[];
  single1: any[];
  multi: any[];

  view: any[] = [450, 300];
  view1: any[] = [1000, 400];
  // options

  colorScheme = {
    domain: ['#618fb0', 'pink', '#C7B42C']
  };
  colorScheme1 = {
    domain: ['green', 'red', '#C7B42C', 'pink' , '#618fb0']
  };

  constructor() {
    Object.assign(this, {single,single1,multi});
    //  Object.assign(this, {single1, multi})
  }

  onSelect(event) {
    console.log(event);
  }


  ngOnInit() {
    console.log(single);
  }

}
