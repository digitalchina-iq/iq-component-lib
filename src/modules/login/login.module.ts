// Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';

// This Module's Components
import { DefindexComponent } from './login.component';



// import { FactoryProvider } from "@angular/core";
@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      LoadingModule.forRoot({
        // animationType: ANIMATION_TYPES.threeBounce,
        // backdropBorderRadius: '10px',
        // primaryColour: '#ffffff', secondaryColour: '#ffffff', tertiaryColour: '#ffffff'
            backdropBackgroundColour: 'rgba(255,255,255,0.2)'
      })
    ],
    declarations: [
        DefindexComponent,
    ],
    exports: [
        DefindexComponent,
    ],
    providers: [
      // { provide: Http }
      // HttpModule
    //  { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions]}
    ]
})
export class LoginModule {

}
