import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/line';
// 引入提示框组件
import 'echarts/lib/component/tooltip';

import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './bug-statistic.component.html',
  animations: [
    flyIn
  ]
})
export class BugStatisticComponent implements OnInit {

  @ViewChild('abc') abc: ElementRef;

  constructor() {}

  ngOnInit() {
    console.log(this.abc);
    let chart = echarts.init(this.abc.nativeElement);
    chart.showLoading('default');
    /*chart.hideLoading();
      chart.setOption({
        tooltip: {
          formatter: '{b}月：{c}元'
        },
        grid: {
          left: '80px',
          top: '30px',
          right: '40px',
          bottom: '30px'
        },
        xAxis: {
          name: '月份',
          nameGap: 5,
          data: Object.keys(chartData)
        },
        yAxis: {
          name: '金额',
          nameGap: 7,
          splitNumber: 3,
          scale: true,
          axisLine: {
            onZero: false
          }
        },
        series: [{
            type: 'line',
            data: Object.keys(chartData).map(item => chartData[item])
        }]
      });*/
  }
}