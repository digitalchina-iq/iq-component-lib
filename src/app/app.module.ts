import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modules/app-routing/
import { AppRoutingModule } from '../routing/app-routing.module';

import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CoreModule } from 'core/core.module';

import { LoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
