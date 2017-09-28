import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//导入该模块所有的Component（组件）
import { BasetplContainerComponent,
  BasetplRootComponent,PrepareT1Component,PrepareT2Component,
  IqSwitcherPageDemoComponent,IqDatepickerDemoComponent,IndexComponent,
  WindowDemoComponent,IqFileUploadDemoComponent,IqSelectDemoComponent
} from './index';

const routes: Routes = [//定义路由
  { path: '', component: BasetplRootComponent, outlet: 'left' },//左侧
  { //右侧根据路径变化
  path: '', component: BasetplContainerComponent,
  children: [
    { path: '', component: IndexComponent },
    {
      path: "widget",
      children: [
        { path: 't1', component: PrepareT1Component },
        { path: 't2', component: PrepareT2Component },
        { path: 'iq-switcher', component: IqSwitcherPageDemoComponent },
        { path: 'iq-datepicker', component: IqDatepickerDemoComponent },
        { path: 'iq-file-upload', component: IqFileUploadDemoComponent },
        { path: 'iq-select', component: IqSelectDemoComponent }
      ]
    },
    {
      path: "services",
      children: [
        { path: 'window', component: WindowDemoComponent }
      ]
    }
  ]
}


  // { path: '', component: ApptplRootComponent}


];

@NgModule({
  imports: [
    RouterModule.forChild(routes)//异步加载特性模块
    ],
  exports: [RouterModule] //用来控制将哪些内部成员暴露给外部使用
})
export class BasetplRoutingModule {
}
