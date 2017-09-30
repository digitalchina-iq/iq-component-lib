import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';
import { environment } from 'environments/environment';

@Component({
  templateUrl: './iq-file-upload.component.html',
  animations: [
    flyIn
  ]
})

export class IqFileUploadDemoComponent {

  date: any[]=[];
  api: string= "api/files/upload"


  constructor(){}

  fileUploadSuccess(data){
    console.log(data)
  }

  deleteItem(i){
    console.log(i);
  }

}
