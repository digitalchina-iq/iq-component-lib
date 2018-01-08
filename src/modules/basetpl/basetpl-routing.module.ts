import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//导入该模块所有的Component（组件）
import { BasetplContainerComponent,
  BasetplRootComponent,PrepareT1Component,PrepareT2Component,
  IqSwitcherPageDemoComponent,IqDatepickerDemoComponent,IndexComponent,
  WindowDemoComponent,IqFileUploadDemoComponent,IqSelectDemoComponent,
  AutoheightDemoComponent, StopParentClickDemoComponent,IqRefactorPipeComponent,
  IqDatePipeComponent, IqFileSizePipeComponent, IqBreadcrumbDemoComponent,
  IcheckDemoComponent, LoadingDemoComponent, IqPagerDemoComponent,
  TrimDemoComponent, TabSwitchDemoComponent, IqTimepickerDemoComponent,
  IeCompatibilityComponent,BasicLayoutComponent,FlexComponent,PrintComponent,
  AngularSelectorComponent, IqNum2ChinesePipeComponent, InterfaceVsClassComponent,
  ArrJsComponent, ObjJsComponent, StrJsComponent, CodeReviewComponent,SettingComponent,
  IqPersonSelectDemoComponent, PlanTrackingComponent, ItemPlanComponent, DragDemoComponent,
  LogComponent,BugAnalyComponent,BugAnalyItemComponent, BugStatisticComponent
} from './index';

const routes: Routes = [//定义路由
  { path: '', component: BasetplRootComponent, outlet: 'left' },//左侧
  { //右侧根据路径变化
  path: '', component: BasetplContainerComponent,
  children: [
    { path: '',data: {breadcrumb: '首页'}, component: IndexComponent },
    {
      path: "widget",
      children: [
        { path: 't1', component: PrepareT1Component },
        { path: 'iq-person-select', component: IqPersonSelectDemoComponent },
        { path: 'iq-switcher', component: IqSwitcherPageDemoComponent },
        { path: 'iq-datepicker', component: IqDatepickerDemoComponent },
        { path: 'iq-timepicker', component: IqTimepickerDemoComponent },
        { path: 'iq-file-upload', component: IqFileUploadDemoComponent },
        { path: 'iq-select', component: IqSelectDemoComponent },
        { path: 'iq-breadcrumb', data: {"breadcrumb": '面包屑导航组件'}, component: IqBreadcrumbDemoComponent },
        { path: 'loading', component: LoadingDemoComponent },
        { path: 'iq-pager', component: IqPagerDemoComponent },
        { path: 'tab-switch', component: TabSwitchDemoComponent }
      ]
    },
    {
      path: "directives",
      children: [
        { path: 'autoheight', component: AutoheightDemoComponent },
        { path: 'stop-parent-click', component: StopParentClickDemoComponent },
        { path: 'icheck', component: IcheckDemoComponent },
        { path: 'trim', component: TrimDemoComponent },
        { path: 'drag', component: DragDemoComponent }
      ]
    },
    {
      path: "pipes",
      children: [
        { path: 'iq-refactor', component: IqRefactorPipeComponent },
        { path: 'iq-date', component: IqDatePipeComponent },
        { path: 'iq-filesize', component: IqFileSizePipeComponent },
        { path: 'iq-num-chinese', component: IqNum2ChinesePipeComponent }
      ]
    },
    {
      path: "services",
      children: [
        { path: 'window', component: WindowDemoComponent }
      ]
    },
    {
      path: "piece",
      children: [
        { path: 'angular-selector', component: AngularSelectorComponent },
        { path: 'interface-vs-class', component: InterfaceVsClassComponent }
      ]
    },
    {
      path: "css",
      children: [
        { path: 'ie-compatibility', component: IeCompatibilityComponent },
        { path: 'basic-layout', component: BasicLayoutComponent },
        { path: 'flex', component: FlexComponent },
        { path:'print',component:PrintComponent}
      ]
    },
    {
      path: "js",
      children: [
        { path: 'arr', component: ArrJsComponent },
        { path: 'obj', component: ObjJsComponent },
        { path: 'str', component: StrJsComponent }
      ]
    },
    {
      path: "assurance",
      children: [
        { path: 'code-review', component: CodeReviewComponent },
        { path: 'bug-analy', component: BugAnalyComponent },
        { path: 'bug-analy/:id', component: BugAnalyItemComponent },
        { path: 'bug-statistic/:id', component: BugStatisticComponent }
      ]
    },
    {
      path: "plan-tracking", component: PlanTrackingComponent
    },
    {
      path: "item-plan", component: ItemPlanComponent
    },
    {
      path: "setting", component: SettingComponent
    },
    {
      path: "log", component: LogComponent
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
