import { Injectable } from '@angular/core';
import { Http,URLSearchParams,
  RequestOptionsArgs,
  ConnectionBackend, RequestOptions, XHRBackend, Headers,Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

export { URLSearchParams ,RequestOptions};

@Injectable()
export class iqHttpService extends Http {
  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions){
    super(_backend,_defaultOptions);
  }

  intercept(observable) {

      return Observable.create((observer) => {
        observable.subscribe(res => {
          console.log("11111")
          observer.next(res);
        }, (err) => {
          console.log("222222")
          console.log(err);
          console.log(err.status);
          observer.error(err);
        }, () => {
          console.log("33333");
          observer.complete();//注意添加这句，否则有可能一些第三方的包不能正常使用，如ng2-translate
        });
      })

    }

  getRequestOptionArgs(options ? : RequestOptionsArgs): RequestOptionsArgs {

      console.log("options");
      console.log(options);
      console.log("options");

        if (options == null) {
          console.log("1")
            options = new RequestOptions();
        }
        if (options.headers == null) {
          console.log("2");
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append("X-LC-Id", "FiwsYyo5ilGwbj1NJ1b2Ub3c-gzGzoHsz");
        options.headers.append("X-LC-Key", "ALC3hN40oHBH7Fke3RJXvvsO");

        return options;
    }

    responseFilter(x){
      console.log("1111111111111111111")
      let flag = true;
              console.log(x.status);
      if(x.status == 200){
        let resbody = x.json();

        // if(resbody.status === undefined){
        //   return true;
        // }
        // if(resbody.status == 200){
        //   flag = true;
        // }
        // else if(resbody.status == 4041){
        //   let x = {"message":"数据错误,5秒后刷新页面",type:"fail"};
        //   // this.windowService.alert(x);
        //
        //   Observable.interval(1000).take(5).subscribe(
        //     i=>x.message = "数据错误,"+(4-i)+"秒后刷新页面",
        //     null, ()=>location.href = location.href);
        // }else{
        //   flag = true;
        // }
      }
      return flag;
    }

  // get(url: string, options?: RequestOptionsArgs){
  //   let _options:RequestOptionsArgs;
  //
  //   if(options){
  //     //复制出新对象进行修改参数值,添加请求时间戳
  //     _options = options;
  //     if(_options["search"]){
  //       let searchParam = _options["search"];
  //       if(typeof searchParam === 'string'){
  //         _options["search"] = new URLSearchParams(searchParam);
  //       }else if(searchParam instanceof URLSearchParams){
  //         let t = new Date().getTime();
  //         if(searchParam.has("m")){
  //           searchParam.set("m"+t,""+t);
  //         }else{
  //           searchParam.set("m",""+t);
  //         }
  //       }
  //     }else{
  //       _options["search"] = new URLSearchParams("m="+new Date().getTime());
  //     }
  //   }else{
  //     _options = new RequestOptions({
  //       search: new URLSearchParams("m="+new Date().getTime())
  //     });
  //
  //     // _options["search"] = JSON.parse(JSON.stringify({m:new Date().getTime()}));
  //   }
  //   return super.get(url,_options);
  // }


    // post(url: string, body: any, options?: RequestOptionsArgs) {
    //   console.log("---");
    //   console.log(this._backend);
    //   console.log("---");
    //   console.log(this._defaultOptions);
    //   // return super.post(url,body,options);
    //   // return super.post(url,body,this.getRequestOptionArgs(options)).filter(this.responseFilter);
    //
    //   return this.intercept(super.post(url,body,this.getRequestOptionArgs(options)));
    // }

    post(url: string, body: any, options ? : RequestOptionsArgs){
      return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    // put(url: string, body: any, options?: RequestOptionsArgs) {
    //   return super.put(url,body,options);
    // }
    // delete(url: string, options?: RequestOptionsArgs) {
    //   return super.delete(url,options);
    // }

}
