// Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
// This Module's Components
import { DefindexComponent } from './login.component';


import { FactoryProvider } from "@angular/core";

@NgModule({
    imports: [
      FormsModule,
      HttpModule
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
