import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {
  private _config = {
    "headurl": '',
    "nickname": ''
  }
  constructor() {
    let userInfo = JSON.parse(window.localStorage.getItem("userinfo"));
    if(userInfo) {
      this._config['headurl'] = userInfo.headurl||"assets/img/user-profile-pic-0.png";
      this._config['nickname'] = userInfo.nickname||"未知";
    }
  }

  get config(){
    return this._config;
  }
  set config(_config:any){
    Object.assign(this._config,_config);
  }
}
