
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

import { IqDatePickerComponent } from "./widgets/iq-datepicker/iq-datepicker.component";


// export { LoadingComponent, IqBreadCrumbComponent, IqDialogPersonSelectComponent, IqSwitcherComponent, ProgressBarComponent,
// IqPersonSelectComponent, IqPopoverPersonSelectComponent, ImageUploadComponent, IqFileData, UserImageComponent, UserImageHeadComponent, UserImageHoverComponent,
// DatePickerComponent, TimePickerComponent, DateTimeRelationComponent, DragComponent, HeaderComponent, IqTlrFrameComponent,
// IqTbFrameComponent, IqRtWidgetComponent,
// PageErrorComponent, PageNotFoundComponent,TestshowComponent,
// PagerPageComponent, Pager, IqDatePickerComponent,FileUploadComponent};

export {
  IqTlrFrameComponent,IqTbFrameComponent,HeaderComponent,
    PageErrorComponent, PageNotFoundComponent,IqSwitcherComponent,ShowcodeComponent,ShowtemComponent,ShowitemoComponent,
    IqDatePickerComponent
}


export let SHARED_COMPONENTS = [IqTlrFrameComponent,IqTbFrameComponent,HeaderComponent,
  PageErrorComponent, PageNotFoundComponent,IqSwitcherComponent,ShowcodeComponent,ShowtemComponent,ShowitemoComponent,
  IqDatePickerComponent
];
