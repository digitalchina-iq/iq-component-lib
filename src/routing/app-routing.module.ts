import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  IqTlrFrameComponent,HeaderComponent,
  IqTbFrameComponent,PageErrorComponent,PageNotFoundComponent } from 'shared/components/index';

import { LoginModule } from 'modules/login/login.module';
import { DefindexComponent } from 'modules/login/login.component';

//必须在引入shared components之后 不知道为啥
import { SharedModule } from 'shared/shared.module';




const routes: Routes = [
    { path: '', component: DefindexComponent},
  // // {
	// // 	path:'',
	// // 	redirectTo:'login',
	// // 	pathMatch:'full'
  // // },   
  // {
  //   path:'login',
  //   loadChildren: 'modules/login/login.module#LoginModule'
  // },
  // // {
  // //   path: '', component: DefindexComponent,
  // //   children: [
  // //     {
  // //       path :'login',
  // //       loadChildren: 'modules/login/login.module#LoginModule'
  // //     }
  // //   ]
  // // },
  {
    path: '', component: IqTlrFrameComponent,
    children: [
      {
        path: 'index',
        data: {breadcrumb: '首页'},
        loadChildren: 'modules/basetpl/basetpl.module#BasetplModule'
      }
    ]
  },
  // {
  //   path:"",
  //   loadChildren: 'modules/apptpl/apptpl.module#ApptplModule'
  // },
  {
    path: '500', component: IqTbFrameComponent,
    children: [
      { path: '', component: PageErrorComponent }
    ]
  },
  {
    path: '**', component: IqTbFrameComponent,
    children: [
      { path: '', component: PageNotFoundComponent }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    LoginModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
