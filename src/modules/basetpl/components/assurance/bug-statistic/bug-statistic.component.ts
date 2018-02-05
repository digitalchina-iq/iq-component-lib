import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';

// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入散点图。
import 'echarts/lib/chart/scatter';
//引入饼图
import 'echarts/lib/chart/pie';
// 引入提示框组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

import { environment } from 'environments/environment';

import { flyIn } from 'animations/fly-in';

import { BUG_TYPE } from '../bug-analy-item/bug-analy-item.component';

@Component({
  templateUrl: './bug-statistic.component.html',
  styles: [`
    .statistic-btn {
      float: left;
      padding-right: 20px;
      border-right: 1px solid #ccc;
    }
    .statistic-btn>ul>li {
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      width: 60px;
      list-style: none;
      cursor: pointer;
    }
    .statistic-btn>ul>li.active {
      border: 1px solid #57b9f8;
    }
  `],
  animations: [
    flyIn
  ]
})
export class BugStatisticComponent implements OnInit, OnDestroy {

  type: string = '总览';
  chart: any;
  id: string;
  cache = {};
  mapping = {username: '姓名', type: '类型', grade: '严重等级', state: '状态'};
  
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    private http: Http,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.chart = echarts.init(this.wrapper.nativeElement);
    this.id = this.activatedRoute.snapshot.params['id'];
    this.chart.showLoading({
      text: '请耐心等待~'
    });

    this.chart.on('click', params => {
      if(params.seriesType === 'pie') {
        this.router.navigate(['index/assurance/bug-analy', this.id], {queryParams: {[params.seriesName]: params.name}})
      }
      if(params.seriesType === 'scatter') {
        this.router.navigate(['index/assurance/bug-analy', this.id], {queryParams: {username: params.seriesName, type: params.data[0], grade: params.data[1]}})
      }
    })

    this.getScatterChartData();
  }

  ngOnDestroy() {
    this.cache = {};
  }

  toggle(type) {
    this.type = type;
    switch (type) {
      case "总览":
        this.getScatterChartData();
        break;
      case "人员":
        this.getBugCounts('user', 'username');
        break;
      case "类型":
        this.getBugCounts('type', 'type');
        break;
      case "严重等级":
        this.getBugCounts('grade', 'grade');
        break;
      case "状态":
        this.getBugCounts('state', 'state');
        break;
    }
  }

  getScatterChartData() {
    if(this.cache['all']) {
      this.setScatterChart(this.cache['all']);
      return;
    }
    this.chart.showLoading();
    this.http.get(environment.nodeServer + `bug-items/${this.id}/statistic`).subscribe(response => {
      let list = response.json().results;
      let arr1 = [], obj = {};
      list.forEach(item => {
        if(arr1.indexOf(item.username) === -1) {
          arr1.push(item.username);
          obj[item.username] = [[item.type, item.grade, item.value]];
        } else {
          obj[item.username].push([item.type, item.grade, item.value]);
        }
      });
      this.cache['all'] = obj;
      this.setScatterChart(obj);
    })
  }

  setScatterChart(data) {
    this.chart.clear();
    this.chart.hideLoading();

    let userList = Object.keys(data);

    let series = userList.map(item => {
      return {
        name: item,
        data: data[item],
        type: 'scatter',
        encode: {
          x: 0,
          y: 1
        },
        symbolSize: function (p) {
          return p[2] - (p[2] - 25)/8;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[2] + '个';
            },
            position: 'top'
          }
        }
      }
    })

    let option = {
        title: {
          text: 'bug统计',
          textStyle: {
            color: '#fff'
          }
        },
        color: ['#84c1ff','#ff7575','#d3a4ff','#c5d208','#96fed1','#ffa6ff','#16ab0d','#d0d0d0','#ffaad5','#93ff93','#ccff80'],
        legend: {
          right: 10,
          orient: 'vertical',
          data: userList,
          textStyle: {
            color: '#fff'
          }
        },
        textStyle: {
          color: '#fff'
        },
        xAxis: {
          name: 'bug类型',
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            alignWithLabel: true,
            inside: true
          },
          data: BUG_TYPE.map(v => v.type),
          splitLine: {
              lineStyle: {
                  type: 'dashed'
              }
          }
        },
        yAxis: {
          name: '严重等级',
          axisLine: {
            lineStyle: {
              color: '#fff'
            },
            symbol: ['none', 'arrow']
          },
          axisTick: {
            alignWithLabel: true,
            inside: true
          },
          splitLine: {
            show: false
          }
        },
        series: series
    };

    this.chart.setOption(option);
  }

  getBugCounts(url: string, tooltip: string) {
    if(this.cache[url]) {
      this.setPieChart(this.cache[url], tooltip);
      return;
    }
    this.chart.showLoading();
    this.http.get(environment.nodeServer + `bug-items/${this.id}/${url}-bug-counts`).subscribe(response => {
      let data = response.json();
      this.cache[url] = data.results;
      this.setPieChart(data.results, tooltip);
    })
  }

  setPieChart(data: any[], tooltip: string) {
    this.chart.clear();
    this.chart.hideLoading();

    let option = {
      title: {
        text: 'bug数量及占比',
        textStyle: {
          color: '#fff'
        }
      },
      color: ['#84c1ff','#a6ffff','#ff7575','#ffaad5','#d3a4ff','#aaf','#96fed1','#ffa6ff','#d0d0d0','#93ff93','#ccff80'],
      legend: {
        right: 10,
        orient: 'vertical',
        data: data.map(v => v.name),
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        show: true,
        formatter: this.mapping[tooltip] + '：{b}<br>\n数量：{c}<br>占比：{d}%'
      },
      series: [{
        name: tooltip,
        type: 'pie',
        data: data
      }]
    };

    this.chart.setOption(option);
  }

  goBack() {
    this.router.navigate(['index/assurance/bug-analy', this.id]);
  }
}