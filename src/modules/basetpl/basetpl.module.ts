//导入相应模块
import { NgModule } from '@angular/core';

import { BasetplRoutingModule } from './basetpl-routing.module';
import { SharedModule } from 'shared/shared.module';

import { Basetpl_COMPONENTS } from './index';

import { BasetplService } from './services/basetpl.service';

import { NgxChartsModule } from "@swimlane/ngx-charts";

import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';

//@NgModule装饰器用来为模块定义元数据
@NgModule({
  imports: [//导入其他module，其它module暴露的出的Components、Directives、Pipes等可以在本module的组件中被使用
    SharedModule,
    BasetplRoutingModule,
    NgxChartsModule,
    LoadingModule.forRoot({
      backdropBackgroundColour: 'rgba(255,255,255,0.2)'
    })
  ],
  declarations: [//模块内部Components/Directives/Pipes的列表，声明一下这个模块内部成员
    Basetpl_COMPONENTS
  ],
  providers:[//指定应用程序的根级别需要使用的service
    BasetplService
  ]
})

//暴露出Module
export class BasetplModule { }
