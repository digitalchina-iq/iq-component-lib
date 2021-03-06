import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Injectable()
export class BreadcrumbService {
  public breadcrumb = [
    { "label": "返回登录页", url: "/" }
  ];
  private generalBreadcrumb(x,path) {
    if (x) {
      if(x.url.length>0){
        let tmpList = [];
        x.url.forEach((v)=>tmpList.push(v));
        path += "/"+tmpList.join("/");
      }
      if(x.data.breadcrumb){
        let flag = x.url.length>0 ||
          x.data.breadcrumb != this.breadcrumb[this.breadcrumb.length-1].label;
        if( flag ){
          this.breadcrumb.push({
            "label":x.data.breadcrumb,
            "url":path
          })
        }
      }
      if (x.firstChild) {
        this.generalBreadcrumb(x.firstChild,path);
      }
    }
  }

  public constructor(router: Router, route: ActivatedRoute) {
    router.events.subscribe(event => {
      // console.log(1);
      if (event instanceof NavigationEnd) {
        let tmp = route.snapshot;
        // firstChild()
        this.breadcrumb.length = 1;
        let path = "";
        this.generalBreadcrumb(tmp,path);
      }
    })
  }
}
