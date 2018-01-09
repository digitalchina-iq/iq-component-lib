import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class BugStatisticComponent implements OnInit {

  type: string = '总览';
  chart: any;
  objId: string;
  loading: boolean;
  userList: string[] = [];
  totalNumList: any[] = [];
  userNumList: any[] = [];
  cache: any = {};
  
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    private http: Http,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.loading = true;
    this.chart = echarts.init(this.wrapper.nativeElement);
    this.objId = this.activatedRoute.snapshot.params['id'];
    this.chart.showLoading({
      text: '请耐心等待~'
    });

    this.chart.on('click', params => {
      if(params.seriesType === 'pie') {
        this.router.navigate(['index/assurance/bug-analy', this.objId], {queryParams: {[params.seriesName]: params.name}})
      }
      if(params.seriesType === 'scatter') {
        this.router.navigate(['index/assurance/bug-analy', this.objId], {queryParams: {username: params.seriesName, type: params.data[0], grade: params.data[1]}})
      }
    })

    this.getUsers().then(data => {
      let users = data.map(item => item.nickname);
      let pList = [];
      users.forEach(item => {
        pList.push(this.getData({username: item}).then(v => {
          if(v){
            this.userList.push(item);
            this.userNumList.push({name: item, value: v});
          }
          return v;
        }));
      });
      Promise.all(pList).then(v => {
        this.getChartData();
      })
    });
  }

  toggle(type) {
    this.type = type;
    switch (type) {
      case "总览":
        this.setScatterChart(this.totalNumList);
        break;
      case "人员":
        this.setPieChart(this.userNumList, 'username', '姓名');
        break;
      case "类型":
        this.getTypeData(BUG_TYPE.map(item => item.type), 'type', '类型');
        break;
      case "严重等级":
        this.getTypeData(['1','2','3','4','5'], 'grade', '严重等级');
        break;
      case "状态":
        this.getTypeData(['新建','正在修改','待测试','被拒绝','驳回','重新打开','关闭'], 'state', '状态');
        break;
    }
  }

  getChartData() {
    let pList = [];

    this.userList.forEach(item => {
      let proList = [];

      BUG_TYPE.forEach(bug => {
        let q2 = {username: item, type: bug.type};

        let temp = this.getData(q2).then(res => {

          if(res) {
            let pro2List = [];

            [1,2,3,4,5].forEach(n => {
              let q3 = Object.assign({}, q2, {grade: String(n)});
              pro2List.push(this.getData(q3).then(v => [bug.type, n, v]));//push
            })//[1,2,3,4,5]forEach

            return Promise.all(pro2List);
          }//if(res)

        })//q2 then
        
        proList.push(temp);

      })//BUG_TYPE forEach

      pList.push(Promise.all(proList).then(list => {
        list = list.filter(v => v).map(v => v.filter(m => m[2])).reduce((p,c) => [...p,...c]);
        return list;
      }))
    })//users forEach

    Promise.all(pList).then(list => {
      this.loading = false;
      this.totalNumList = list;
      this.setScatterChart(list);
    })
    
  }

  getTypeData(arr, attr, tooltip) {
    if(this.cache[attr]){
      this.setPieChart(this.cache[attr], attr, tooltip);
      return;
    }
    this.chart.showLoading();
    let proList = [];
    arr.forEach(item => {
      proList.push(this.getData({[attr]: item}).then(v => {
        return {name: item, value: v};
      }));
    })
    Promise.all(proList).then(data => {
      let list = data.filter(item => item.value);
      this.cache[attr] = list;
      this.setPieChart(list, attr, tooltip);
    })
  }

  setScatterChart(data) {
    this.chart.clear();
    this.chart.hideLoading();

    let getSeries = () => {
      let tempArr = [];
      this.userList.forEach((v,i) => {
        tempArr.push({
          name: v,
          data: data[i],
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

        })
      })
      return tempArr;
    }

    let option = {
        title: {
          text: 'bug统计',
          textStyle: {
            color: '#fff'
          }
        },
        color: ['#84c1ff','#a6ffff','#ff7575','#ffaad5','#d3a4ff','#aaf','#96fed1','#ffa6ff','#d0d0d0','#93ff93','#ccff80'],
        legend: {
          right: 10,
          orient: 'vertical',
          data: this.userList,
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
        series: getSeries()
    };

    this.chart.setOption(option);
  }

  setPieChart(data, attr, tooltip) {
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
        data: this.userList,
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        show: true,
        formatter: tooltip + '：{b}<br>\n数量：{c}<br>占比：{d}%'
      },
      series: [{
        name: attr,
        type: 'pie',
        data: data
      }]
    };

    this.chart.setOption(option);

  }

  getUsers() {
    return this.http.get(environment.server + 'users')
                    .toPromise().then(response => response.json()).then(data => data.results);
  }

  getData(query) {
    let queryObj = {};
    for(let i in query){
      let val = query[i];
      if(val || val === 0){
        queryObj[i] = val;
      }
    }
    return this.http.get(environment.server + `classes/Bugma`, {params: { count: 1, where: Object.assign({pid: this.objId}, queryObj)}})
                    .map(res => res.json()).map(data => data.count).toPromise();
  }

  goBack() {
    this.router.navigate(['index/assurance/bug-analy', this.objId]);
  }
}