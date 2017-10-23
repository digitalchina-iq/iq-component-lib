import { Component, OnInit ,TemplateRef ,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptionsArgs, URLSearchParams, Http, RequestOptions } from '@angular/http';
import * as AV from 'leancloud-storage';
import { environment } from 'environments/environment';
import 'rxjs/Rx';



import { iqHttpService } from 'core/services/iq-http.service'
import { WindowService } from 'core/services/window.service'

// import { Observable } from 'rxjs/Observable';

// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
declare var $;

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
    // providers: [WindowService]
})
export class DefindexComponent implements OnInit  {

  // public modalRef: BsModalRef;

  userInfo: any = {
    username: "",
    password: ""
  };


  // public openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  // headers = new Headers({
  //    'Content-Type': 'application/json',
  //   //  'ticket': localStorage.getItem('ticket')
  //   "X-LC-Id": "FiwsYyo5ilGwbj1NJ1b2Ub3c-gzGzoHsz",
  //   "X-LC-Key": "ALC3hN40oHBH7Fke3RJXvvsO",
  //   // "X-LC-Session": "hbppb5hnfdk1imnj2s05e4ho5"
  //  });
  // options = new RequestOptions({ headers: this.headers });


  // constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private http: Http){
  //   super(_backend,_defaultOptions);
  // }

  constructor(private iqhttpservice: iqHttpService,
    private iqhttp: Http,
    // private modalService: BsModalService
    private windowservice:WindowService,
    private router: Router
  ){

  }

  ngOnInit() {


    // this.iqhttpservice.post(environment.server+"/login",
    //   {
    //     "username":this.userInfo.userInfo,
    //     "password":this.userInfo.password
    //   })
    //   .map(res => res.json())
    //   .subscribe(res => {
    //       console.log(res)
    //   })

    // this.iqhttpservice.post(environment.server+"/login",
    //   {
    //     "username":"admin",
    //     "password":"123456"
    //   },this.options)
    //   .map(res => res.json())
    //   .subscribe(res => {
    //       console.log(res)
    //   })

    // console.log(this._backend);
    // console.log(this._defaultOptions);

    // console.log(AV);

    //  console.log(this.av)
    // var TestObject = AV.Object.extend('TestObject');
    // var testObject = new TestObject();
    // testObject.save({
    //   words: 'Hello World!'
    // }).then(function(object) {
    //   alert('LeanCloud Rocks!');
    // })
  }

  login(){

    // console.log(this.windowservice);



    this.iqhttpservice.post(environment.server+"/login",
      {
        "username":this.userInfo.username,
        "password":this.userInfo.password
      })
      .map(res => res.json())
      .subscribe(res => {
          // console.log("----");
          // console.log(res)
          // console.log("++++");
          this.router.navigate(["/index"]);
      })

    // AV.User.logIn(this.userInfo.username, this.userInfo.password).then(function (loginedUser) {
    //   // console.log(loginedUser);
    //   alert(loginedUser);
    //  }, function (error) {
    //    alert(JSON.stringify(error));
    //  });

    // this.http.post(environment.server+"/login",
    //   {
    //     "username":"admin",
    //     "password":"123456"
    //   },this.options)
    //   .map(res => res.json())
    //   .subscribe(res => {
    //       console.log(res)
    //   })

    // this.http.get(environment.server+"/users/me",this.options)
    // .map(res => res.json())
    // .subscribe(res => {
    //     console.log(res)
    // })


  }


  test(){
    // username

    // this.iqhttpservice.get(environment.server+"/classes/Product")
    //   .map(res => res.json())
    //   .subscribe(res => {
    //       console.log("+++++");
    //       console.log(res)
    //       console.log("+++++");
    //       // this.router.navigate(["/index"]);
    //   })

    this.iqhttp.get(environment.server+"/classes/Product")
    .map(res => res.json())
    .subscribe(res => {
        console.log("+++++");
        console.log(res)
        console.log("+++++");
        // this.router.navigate(["/index"]);
    })


  }




}
