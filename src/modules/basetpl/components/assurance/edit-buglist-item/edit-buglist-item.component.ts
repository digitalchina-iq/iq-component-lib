import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from 'environments/environment';
import { WindowService } from 'core';
import { XcModalService, XcModalRef } from 'shared/modules';

declare var window;

class BugRecord {
  id: string;
  pid: string;
  childtype: string;
  des: string;
  userid: string;
  username: string;
  type: string;
  grade: string;
  triggerdate: string;
  closedate: string;
  state: string;
  file: Array<{name: string, url: string}> = [];
}

@Component({
  templateUrl: './edit-buglist-item.component.html',
  styleUrls: ['./edit-buglist-item.component.scss']
})
export class EditBugListItemComponent implements OnInit {

  modal: XcModalRef;
  users: any[];
  bugType: Array<{type: string, childType: string[]}>
  record: BugRecord = new BugRecord();
  childType: string[];
  isDisabled: boolean;
  fileUploadUrl: string = environment.server + 'files/upload';

  constructor(
    private http: Http,
    private xcModalService: XcModalService,
    private windowService: WindowService){}

  ngOnInit() {
    this.modal = this.xcModalService.getInstance(this);
    this.modal.onShow().subscribe(data => {
      let config = JSON.parse(JSON.stringify(data.config));
      this.users = config.users;
      this.bugType = config.bugType;
      this.record = JSON.parse(JSON.stringify(data.record));
      let parentType = this.bugType.filter(item => item.type === this.record.type)[0];
      if(parentType){
        this.childType = parentType.childType;
      } else {
        this.childType = [];
      }
    })
  }

  hide(data?) {
    this.modal.hide(data);
  }

  bugTypeChange(e) {
    this.childType = this.bugType.filter(item => item.type === e)[0].childType;
    this.record.childtype = this.childType[0];
  }

  save() {
    if(this.record.state === '关闭' && !this.record.closedate) {
      this.windowService.alert({message: '请选择关闭日期', type: 'fail'});
      return;
    }
    delete this.record['createdAt'];
    this.record.grade = String(this.record.grade||'');
    this.isDisabled = true;
    this.http.put(environment.nodeServer + `bug-items/${this.record.pid}/details/${this.record.id}`, this.record).subscribe(data => {
      this.isDisabled = false;
      this.hide(true);
    })
  }

  deleteFile(i) {
    this.record.file.splice(i, 1);
  }

  fileUploadSuccess(e){
    this.record.file.push({name: e.name, url: e.url});
  }
}
