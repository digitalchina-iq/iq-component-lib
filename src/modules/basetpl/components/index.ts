
import { BasetplContainerComponent } from './basetpl-container.component';
import { BasetplRootComponent } from './basetpl-root.component';

//widgets
import { PrepareT1Component } from './widgets/prepare-t1/prepare-t1.component';
import { PrepareT2Component } from './widgets/prepare-t2/prepare-t2.component';
import { IqSwitcherPageDemoComponent } from './widgets/switcher/switcher-page.component';
import { IqDatepickerDemoComponent } from './widgets/iq-datepicker/iq-datepicker.component';
import { IndexComponent } from './widgets/index/index.component';
import { IqFileUploadDemoComponent } from './widgets/iq-file-upload/iq-file-upload.component';
import { IqSelectDemoComponent } from './widgets/iq-select/iq-select.component';
import { IqBreadcrumbDemoComponent } from './widgets/iq-breadcrumb/iq-breadcrumb.component';
import { LoadingDemoComponent } from './widgets/loading/loading.component';

//directives
import { AutoheightDemoComponent } from './directives/autoheight/autoheight.component';
import { StopParentClickDemoComponent } from './directives/stopParentClick/stop-parent-click.component';
import { IcheckDemoComponent } from './directives/icheck/icheck.component';

//pipes
import { IqRefactorPipeComponent } from './pipes/iq-refactor/iq-refactor.component';
import { IqDatePipeComponent } from './pipes/iq-date/iq-date.component';
import { IqFileSizePipeComponent } from './pipes/iq-filesize/iq-filesize.component';

//services
import { WindowDemoComponent } from './services/window/window.component';



//暴露出所有Component
export { BasetplContainerComponent,BasetplRootComponent,PrepareT1Component,PrepareT2Component,
  IqSwitcherPageDemoComponent,IqDatepickerDemoComponent,IndexComponent,WindowDemoComponent,IqFileUploadDemoComponent,
  IqSelectDemoComponent,AutoheightDemoComponent,StopParentClickDemoComponent,IqRefactorPipeComponent,IqDatePipeComponent,
  IqFileSizePipeComponent,IqBreadcrumbDemoComponent,IcheckDemoComponent,LoadingDemoComponent
};

//模块内部Components列表
export let Basetpl_COMPONENTS =
[ BasetplContainerComponent,
  BasetplRootComponent,
  PrepareT1Component,
  PrepareT2Component,
  IqSwitcherPageDemoComponent,
  IqDatepickerDemoComponent,
  IndexComponent,
  WindowDemoComponent,
  IqFileUploadDemoComponent,
  IqSelectDemoComponent,
  AutoheightDemoComponent,
  StopParentClickDemoComponent,
  IqRefactorPipeComponent,
  IqDatePipeComponent,
  IqFileSizePipeComponent,
  IqBreadcrumbDemoComponent,
  IcheckDemoComponent,
  LoadingDemoComponent
];
