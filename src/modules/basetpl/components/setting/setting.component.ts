import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';
import { environment } from 'environments/environment';

import { Http } from '@angular/http';
import { WindowService, HeaderService } from 'core';

class UserInfo {
  objectId: string;
  headurl: string;
  nickname: string;
  city: string;
  birthday: string;
  email: string;
  mobilePhoneNumber: string;
  about: string;
  sessionToken: string;

  constructor(obj) {
    this.objectId = obj['objectId'];
    this.headurl = obj['headurl'];
    this.nickname = obj['nickname'];
    this.city = obj['city'];
    this.birthday = obj['birthday'];
    this.email = obj['email'];
    this.mobilePhoneNumber = obj['mobilePhoneNumber'];
    this.about = obj['about'];
    this.sessionToken = obj['sessionToken'];
  }
}

let loaclInfo = JSON.parse(window.localStorage.getItem('userinfo'));

@Component({
  templateUrl: './setting.component.html',
  styles: [`.field-datepicker{
    display: inline-block;
    width: 300px;
    margin-left: 20px;
  }
  .field-datepicker /deep/ .my-datepicker>input.m-input{
      background: rgba(0,0,0,.2);
      color: #fff;
    }`],
  animations: [
    flyIn
  ]
})
export class SettingComponent {

  uploadApi: string;
  canSave: boolean;

  userInfo: UserInfo = new UserInfo(loaclInfo);
  _userInfo: UserInfo = new UserInfo(loaclInfo);

  constructor(
    private iqhttp: Http,
    private windowService: WindowService, 
    private headerService: HeaderService){}

  ngOnInit() {
    this.uploadApi = environment.server + 'files/upload';
  }

  fileUploadSuccess(data){
    this.userInfo.headurl = data.url;
    this.headerService.config = {headurl: data.url};
    window.localStorage.setItem('userinfo', JSON.stringify(this.userInfo));

    this.iqhttp.put(environment.server+"users/"+this.userInfo["objectId"],{
      "headurl":data.url
    }).subscribe();
  }

  editUserInfo() {
    this.canSave = true;
  }

  save() {
    this.iqhttp.put(environment.server + 'users/' + this.userInfo['objectId'], this._userInfo).subscribe(data => {
      this.canSave = false;
      this.userInfo = JSON.parse(JSON.stringify(this._userInfo));
      window.localStorage.setItem('userinfo', JSON.stringify(this.userInfo));
    });
  }

  cancel() {
    this.canSave = false;
    this._userInfo = JSON.parse(JSON.stringify(this.userInfo));
  }


}
