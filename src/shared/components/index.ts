
import { HeaderComponent } from './frame-components/header.component';
import { IqTlrFrameComponent } from './frame-components/iq-tlr-frame.component';
import { IqTbFrameComponent } from './frame-components/iq-tb-frame.component';

import {PageErrorComponent} from "./page-components/page-error.component";
import {PageNotFoundComponent} from "./page-components/page-not-found.component";

/*组件添加*/
import { IqSwitcherComponent } from "./widgets/iq-switcher/iq-switcher.component";
import { ShowcodeComponent } from "./widgets/showcode/showcode.component";
import { ShowtemComponent } from "./widgets/showtem/showtem.component";
import { ShowitemoComponent } from "./widgets/showitemo/showitemo.component";
import { ShowitemexampleComponent } from "./widgets/showitemexample/showitemexample.component";
import { IqTabComponent } from './widgets/tab-switch/iq-tab.component';
import { IqTabIndexComponent } from './widgets/tab-switch/iq-tab-index.component';
import { IqTabContentComponent } from './widgets/tab-switch/iq-tab-content.component';

import { IqDatePickerComponent } from "./widgets/iq-datepicker/iq-datepicker.component";
import { IqTimePickerComponent } from './widgets/iq-timepicker/iq-timepicker.component';
import { FileUploadComponent } from './widgets/file-upload/file-upload.component';
import { IqSelectComponent } from './widgets/iq-select/iq-select.component';
import { IqBreadCrumbComponent } from './widgets/iq-breadcrumb/iq-breadcrumb.component';
import { LoadingComponent } from './widgets/loading/loading.component';
import { PagerPageComponent, Pager } from './widgets/iq-pager/iq-pager.component';
import { UserImageHeadComponent } from './widgets/user-image/user-image-head.component';
import { UserImageComponent } from './widgets/user-image/user-image.component';
import { IqPersonSelectComponent } from './widgets/iq-person-select/iq-person-select.component';
import { IqDialogPersonSelectComponent } from './widgets/iq-person-select/iq-dialog-person-select.component';
import { IqPopoverPersonSelectComponent } from './widgets/iq-person-select/iq-popover-person-select.component';

export {
  IqTlrFrameComponent,IqTbFrameComponent,HeaderComponent,
    PageErrorComponent, PageNotFoundComponent,IqSwitcherComponent,ShowcodeComponent,ShowtemComponent,ShowitemoComponent,
    IqDatePickerComponent,ShowitemexampleComponent,FileUploadComponent,IqSelectComponent,IqBreadCrumbComponent,
    LoadingComponent,PagerPageComponent,Pager, IqTabComponent, IqTabIndexComponent, IqTabContentComponent,
    IqTimePickerComponent,UserImageHeadComponent,UserImageComponent,IqPersonSelectComponent,IqDialogPersonSelectComponent,IqPopoverPersonSelectComponent
}

export let SHARED_ENTRY_COMPONENTS = [IqDialogPersonSelectComponent];

export let SHARED_COMPONENTS = [IqTlrFrameComponent,IqTbFrameComponent,HeaderComponent,
  PageErrorComponent, PageNotFoundComponent,IqSwitcherComponent,ShowcodeComponent,ShowtemComponent,ShowitemoComponent,
  IqDatePickerComponent,ShowitemexampleComponent,FileUploadComponent,IqSelectComponent,IqBreadCrumbComponent,
  LoadingComponent,PagerPageComponent, IqTabComponent, IqTabIndexComponent, IqTabContentComponent,
  IqTimePickerComponent,UserImageHeadComponent,UserImageComponent,IqPersonSelectComponent,IqDialogPersonSelectComponent,IqPopoverPersonSelectComponent
];
