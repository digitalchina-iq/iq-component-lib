import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { flyIn } from 'animations/fly-in';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { single, multi, single1 } from './data';

// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
import * as echartsGL from 'echarts-gl';

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

  @ViewChild('wrapper') wrapper: ElementRef;

  constructor() {
    Object.assign(this, {single,single1,multi});
    //  Object.assign(this, {single1, multi})
  }


  ngOnInit() {
    console.log(echartsGL);
    this.chart = echarts.init(this.wrapper.nativeElement);
    var baseTexture = document.createElement('canvas');
    var canvas = document.createElement('canvas');
    
    canvas.width = 1000;
    canvas.height = 500;

    let ctx = canvas.getContext('2d');

    ctx.font = 'bold 16px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    function drawRect(x, y, w, h, c, t) {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#000';
      ctx.fillText(t, x + w / 2, y + h / 2);
    }

    drawRect(0, 0, 1000, 75, 'rgb(130,57,53)', '种子工程');
    drawRect(0, 75, 1000, 50, 'rgb(137,190,178)', '静态自动化编译器');
    
    let grd = ctx.createLinearGradient(0, 125, 1000, 125);
    grd.addColorStop(0, 'rgb(201,186,131)');
    grd.addColorStop(0.2, 'rgb(222,211,140)');
    grd.addColorStop(0.4, 'rgb(222,156,83)');
    grd.addColorStop(0.6, 'rgb(160,191,124)');
    grd.addColorStop(0.8, 'rgb(101,147,74)');
    grd.addColorStop(1, 'rgb(201,186,131)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 125, 1000, 200);
    ctx.fillStyle = '#000';
    ctx.fillText('组件服务库', 100, 225);
    ctx.fillText('静态资源库', 300, 225);
    ctx.fillText('angular2教学培训资源', 500, 225);
    ctx.fillText('前端管理资源', 700, 225);
    ctx.fillText('其他资源', 900, 225);

    /*drawRect(0, 125, 200, 200, 'rgb(201,186,131)', '组件服务库');
    drawRect(200, 125, 200, 200, 'rgb(222,211,140)', '静态资源库');
    drawRect(400, 125, 200, 200, 'rgb(222,156,83)', 'angular2教学培训资源');
    drawRect(600, 125, 200, 200, 'rgb(160,191,124)', '前端管理资源');
    drawRect(800, 125, 200, 200, 'rgb(101,147,74)', '其他资源');*/
    drawRect(0, 325, 1000, 50, 'rgb(38,188,213)', '自动化测试');
    drawRect(0, 375, 1000, 125, 'rgb(255,150,128)', '前端监控');

    this.chart.setOption({
      globe: {
        baseTexture: canvas,
        shading: 'realistic',
        realisticMaterial: {
          roughness: 0.2
        },
        light: {
          main: {
            color: '#999'
          },
          ambient: {
            intensity: 0.6
          },
          ambientCubemap: {
            diffuseIntensity: 0.8
          }
        },
        viewControl: {
          damping: 0.9,
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut',
          autoRotate: true,
          autoRotateSpeed: 20,
          autoRotateAfterStill: 2
        }
      },
      series: []
    });
  }

}
