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

  constructor(){}

  ngOnInit() {
    this.uploadApi = environment.server + 'files/upload';
  }

  fileUploadSuccess(data){
    console.log(data)
  }

  deleteItem(i){
    console.log(i);
  }

}
