import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from 'environments/environment';
import { WindowService } from 'core';
import { XcModalService, XcModalRef } from 'shared/modules';

declare var window;

class BugRecord {
  objectId: string;
  pid: string;
  childtype: string;
  describe: string;
  userid: string;
  username: string;
  type: string;
  grade: string;
  triggerdate: string;
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
      this.childType = this.bugType.filter(item => item.type === this.record.type)[0].childType;
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
    delete this.record['createdAt'];
    this.isDisabled = true;
    this.http.put(environment.server + 'classes/Bugma/' + this.record.objectId, this.record).subscribe(data => {
      this.isDisabled = false;
      this.hide(true);
    })
  }
}
