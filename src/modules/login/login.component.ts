import { Component, OnInit ,TemplateRef ,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptionsArgs, URLSearchParams, Http, RequestOptions } from '@angular/http';
import * as AV from 'leancloud-storage';
import { environment } from 'environments/environment';
import 'rxjs/Rx';


import { HeaderService } from 'core';

// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
declare var $,window;

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
    // providers: [WindowService]
})
export class DefindexComponent implements OnInit  {

  // public modalRef: BsModalRef;
  loading = false;
  userInfo: any = {
    username: "",
    password: ""
  };


  constructor(
    private iqhttp: Http,
    // private modalService: BsModalService
    private router: Router,
    private headerService: HeaderService
  ){

  }

  ngOnInit() {
  }

  login(){

    this.loading = true;

    this.iqhttp.post(environment.server+"/login",
      {
        "username":this.userInfo.username,
        "password":this.userInfo.password
      })
      .map(res => res.json())
      .subscribe(res => {

          var userinfo = JSON.stringify(res);
          window.localStorage.setItem('userinfo',userinfo);
          this.headerService.config = res;

          this.router.navigate(["/index"]);
      },err => {
        this.loading = false;
      })
  }

}
