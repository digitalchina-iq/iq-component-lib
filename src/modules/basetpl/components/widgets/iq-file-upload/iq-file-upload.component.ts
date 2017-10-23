import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';
import { environment } from 'environments/environment';

@Component({
  templateUrl: './iq-file-upload.component.html',
  animations: [
    flyIn
  ]
})

export class IqFileUploadDemoComponent implements OnInit {

  date: any[]=[];

  uploadApi: string;

  imgSrc: string;

  hasUploadedFile: {name: string, size?: number}[] = [{name: 'abc', size: 12321}, {name: 'def', size: 352322}];

  constructor(){}

  ngOnInit() {
    this.uploadApi = environment.server + 'files/upload';
  }

  fileUploadSuccess(data){
    console.log(data);
    this.imgSrc = data.url;
  }

  deleteItem(i){
    console.log(i);
  }

}
