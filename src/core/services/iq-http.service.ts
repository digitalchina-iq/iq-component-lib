import { Injectable } from '@angular/core';
import { Http,URLSearchParams,
  RequestOptionsArgs,
  ConnectionBackend, RequestOptions, XHRBackend, Headers,Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { WindowService } from './window.service'

export { URLSearchParams ,RequestOptions};

declare var window;

@Injectable()
export class iqHttpService extends Http {

  status = {
     "status.400": "错误的请求。由于语法错误，该请求无法完成。",
     "status.401": "未经授权。服务器拒绝响应。",
     "status.403": "已禁止。服务器拒绝响应。",
     "status.404": "未找到。无法找到请求的位置。",
     "status.405": "方法不被允许。使用该位置不支持的请求方法进行了请求。",
     "status.406": "不可接受。服务器只生成客户端不接受的响应。",
     "status.407": "需要代理身份验证。客户端必须先使用代理对自身进行身份验证。",
     "status.408": "请求超时。等待请求的服务器超时。",
     "status.409": "冲突。由于请求中的冲突，无法完成该请求。",
     "status.410": "过期。请求页不再可用。",
     "status.411": "长度必需。未定义“内容长度”。",
     "status.412": "前提条件不满足。请求中给定的前提条件由服务器评估为 false。",
     "status.413": "请求实体太大。服务器不会接受请求，因为请求实体太大。",
     "status.414": "请求 URI 太长。服务器不会接受该请求，因为 URL 太长。",
     "status.415": "不支持的媒体类型。服务器不会接受该请求，因为媒体类型不受支持。",
     "status.416": "HTTP 状态代码 {0}",
     "status.500": "内部服务器错误。",
     "status.501": "未实现。服务器不识别该请求方法，或者服务器没有能力完成请求。",
     "status.503": "服务不可用。服务器当前不可用(过载或故障)。"
   };

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private windowservice: WindowService){
    super(_backend,_defaultOptions);
  }

  intercept(observable) {
      return Observable.create((observer) => {
        observable.subscribe(res => {
          observer.next(res);
          // this.windowservice.alert({message:"success",type:"success"});
        }, (err) => {
          // console.log("222222")
          // console.log(err);
          // console.log(err.status);
           console.log('网络错误:'+err.status+' - '+this.status['status.'+err.status]);
          // console.log(this.windowservice);
          this.windowservice.alert({message:this.status['status.'+err.status],type:"fail"});
          observer.error(err);
        }, () => {
          observer.complete();//注意添加这句，否则有可能一些第三方的包不能正常使用，如ng2-translate
        });
      })

    }

  getRequestOptionArgs(options ? : RequestOptionsArgs): RequestOptionsArgs {

      // console.log("options");
      // console.log(options);
      // console.log("options");

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if(JSON.parse(localStorage.getItem("userinfo")).sessionToken!=null){
          
          // if(options.headers.get("X-LC-Session")==null){

             options.headers.append("X-LC-Session", JSON.parse(localStorage.getItem("userinfo")).sessionToken);
            
          // }
          
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append("X-LC-Id", "FiwsYyo5ilGwbj1NJ1b2Ub3c-gzGzoHsz");
        options.headers.append("X-LC-Key", "ALC3hN40oHBH7Fke3RJXvvsO");
        // options.headers.append("X-LC-Session", "hbppb5hnfdk1imnj2s05e4ho5");

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

  get(url: string, options?: RequestOptionsArgs){
    let _options:RequestOptionsArgs;

    if(options){
      //复制出新对象进行修改参数值,添加请求时间戳
      _options = options;
      if(_options["search"]){
        let searchParam = _options["search"];
        if(typeof searchParam === 'string'){
          _options["search"] = new URLSearchParams(searchParam);
        }else if(searchParam instanceof URLSearchParams){
          let t = new Date().getTime();
          if(searchParam.has("m")){
            searchParam.set("m"+t,""+t);
          }else{
            searchParam.set("m",""+t);
          }
        }
      }else{
        _options["search"] = new URLSearchParams("m="+new Date().getTime());
      }
    }else{
      _options = new RequestOptions({
        search: new URLSearchParams("m="+new Date().getTime())
      });

      // _options["search"] = JSON.parse(JSON.stringify({m:new Date().getTime()}));
    }
    return this.intercept(super.get(url , this.getRequestOptionArgs(_options)));
    // return super.get(url,_options);
  }


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

    put(url: string, body: any, options ? : RequestOptionsArgs){
      return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, body: any, options ? : RequestOptionsArgs){
      return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    // put(url: string, body: any, options?: RequestOptionsArgs) {
    //   return super.put(url,body,options);
    // }
    // delete(url: string, options?: RequestOptionsArgs) {
    //   return super.delete(url,options);
    // }

}
