
import { HeaderComponent } from './frame-components/header.component';
import { IqTlrFrameComponent } from './frame-components/iq-tlr-frame.component';
import { IqTbFrameComponent } from './frame-components/iq-tb-frame.component';

import {PageErrorComponent} from "./page-components/page-error.component";
import {PageNotFoundComponent} from "./page-components/page-not-found.component";

/*组件添加*/
import { SwitcherComponent } from "./widgets/switcher/switcher.component";
import { ShowcodeComponent } from "./widgets/showcode/showcode.component";
import { ShowtemComponent } from "./widgets/showtem/showtem.component";
import { ShowitemoComponent } from "./widgets/showitemo/showitemo.component";

import { MyDatePickerComponent } from "./widgets/my-datepicker/my-datepicker.component";


// export { LoadingComponent, IqBreadCrumbComponent, IqDialogPersonSelectComponent, SwitcherComponent, ProgressBarComponent,
// IqPersonSelectComponent, IqPopoverPersonSelectComponent, ImageUploadComponent, IqFileData, UserImageComponent, UserImageHeadComponent, UserImageHoverComponent,
// DatePickerComponent, TimePickerComponent, DateTimeRelationComponent, DragComponent, HeaderComponent, IqTlrFrameComponent,
// IqTbFrameComponent, IqRtWidgetComponent,
// PageErrorComponent, PageNotFoundComponent,TestshowComponent,
// PagerPageComponent, Pager, MyDatePickerComponent,FileUploadComponent};

export {
  IqTlrFrameComponent,IqTbFrameComponent,HeaderComponent,
    PageErrorComponent, PageNotFoundComponent,SwitcherComponent,ShowcodeComponent,ShowtemComponent,ShowitemoComponent,
    MyDatePickerComponent
}


export let SHARED_COMPONENTS = [IqTlrFrameComponent,IqTbFrameComponent,HeaderComponent,
  PageErrorComponent, PageNotFoundComponent,SwitcherComponent,ShowcodeComponent,ShowtemComponent,ShowitemoComponent,
  MyDatePickerComponent
];
