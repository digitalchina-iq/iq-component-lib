import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './iq-file-upload.component.html',
  animations: [
    flyIn
  ]
})

export class IqFileUploadDemoComponent {

  date: any[]=[];

  constructor(){}

  fileUploadSuccess(data){
    console.log(data)
  }

  deleteItem(i){
    console.log(i);
  }

}
