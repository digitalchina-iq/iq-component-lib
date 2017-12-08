import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';
import { environment } from 'environments/environment';

import { Http } from '@angular/http';
import { WindowService } from 'core';

@Component({
  templateUrl: './setting.component.html',
  animations: [
    flyIn
  ]
})

export class SettingComponent {

  date: any[]=[];
  
  uploadApi: string;
  
  imgSrc: string;

  userInfo: {}=JSON.parse(window.localStorage.getItem('userinfo'));

  constructor(private iqhttp: Http, private windowService: WindowService){}

  ngOnInit() {
    this.uploadApi = environment.server + 'files/upload';
    // this.userInfo = JSON.parse(window.localStorage.getItem('userinfo'));
    this.imgSrc=this.userInfo["headurl"];
    console.log(this.userInfo);
    console.log(this.userInfo["nickname"]);

    // this.iqhttp.get(environment.server+"/classes/_file/"+this.userInfo.headid)
    // .map(res => res.json())
    // .subscribe(res => {
    //   this.imgSrc=res.url;
    // })

    // this.imgSrc=window.
    // this.iqhttp.put(environment.server+"/classes/Product/59cf01dd67f356003a61f9a1",
    // {
    //         "price":78
    //       },
    // )
    // .map(res => res.json())
    // .subscribe(res => {
    //     console.log("+++++");
    //     console.log(res)
    //     console.log("+++++");
    //     // this.router.navigate(["/index"]);
    // })


  }

  fileUploadSuccess(data){
    console.log(data);
    this.imgSrc = data.url;

    this.iqhttp.put(environment.server+"/users/"+this.userInfo["objectId"],{
      "headurl":data.url
    })
    .map(res => res.json())
    .subscribe(res => {})


  }

  deleteItem(i){
    console.log(i);
  }


}
