import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploadModule } from 'ng2-file-upload';

import { SHARED_PIPES,SHARED_DIRECTIVES,SHARED_COMPONENTS } from 'shared/index';


@NgModule({
  //imports 导入
  imports: [RouterModule,CommonModule,FormsModule,FileUploadModule],

  //公开一些组件,这样其他模块只要导入该模块，就可以在其组件模板中使用到出的这些组件了。
  exports: [SHARED_PIPES,SHARED_DIRECTIVES,SHARED_COMPONENTS,RouterModule,CommonModule,FormsModule,FileUploadModule],

  //声明组件 属于该模块
  declarations: [SHARED_PIPES,SHARED_DIRECTIVES,SHARED_COMPONENTS],
  // entryComponents:[SHARED_ENTRY_COMPONENTS],
  // providers: [SHARED_PROVIDERS]
})
export class SharedModule { }
