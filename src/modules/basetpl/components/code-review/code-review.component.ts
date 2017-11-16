import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from 'animations/fly-in';
import * as moment from 'moment';

import { environment } from 'environments/environment';

declare var window;

class RecordItem {
  filename:string;
  userid:string;
  username:string;
}

class Record {
  createdAt: Date;
  objectId: string;
  userid: string;
  username: string;
  isrows: RecordItem[] = [new RecordItem()];
  isnotes: RecordItem[] = [new RecordItem()];
  isindent: RecordItem[] = [new RecordItem()];
  isline: RecordItem[] = [new RecordItem()];
  isorder: RecordItem[] = [new RecordItem()];
  isalias: RecordItem[] = [new RecordItem()];
  isseparate: RecordItem[] = [new RecordItem()];
  isconst: RecordItem[] = [new RecordItem()];
  isconstructor: RecordItem[] = [new RecordItem()];
  isbasic: RecordItem[] = [new RecordItem()];
}

@Component({
  templateUrl: './code-review.component.html',
  styleUrls: ['./code-review.component.scss'],
  animations: [
    flyIn
  ]
})
export class CodeReviewComponent implements OnInit {
  today: string;
  loading: boolean;
  objId: string;
  recordList: Record[];
  recordItem: Record;
  users: any[];

  constructor(private http: Http){}

  ngOnInit() {
    this.initForm();

    this.today = moment().format('YYYY-MM-DD');
    this.http.get(environment.server + 'users').toPromise().then(response => response.json()).then(data => {
      this.users = data.results;
    })

    this.getData();
  }

  initForm() {
    this.recordItem = new Record();
    let userInfo = JSON.parse(window.localStorage.getItem('userinfo'));

    this.recordItem.userid = userInfo ? userInfo.objectId : '';
    this.recordItem.username = userInfo ? userInfo.nickname : '请先登录';
  }

  getData() {
    this.loading = true;
    this.http.get(environment.server + 'classes/Cr').toPromise().then(response => response.json()).then(data => {
      console.log(data);
      this.loading = false;
      this.recordList = data.results;
      this.initForm();

      let lastRecord = this.recordList[this.recordList.length - 1];
      if(moment(lastRecord.createdAt).format('YYYY-MM-DD') === this.today) {
        this.objId = lastRecord.objectId;
        Object.assign(this.recordItem, JSON.parse(JSON.stringify(lastRecord)));
        this.getNotBlankList();
      }
    })
  }

  getNotBlankList() {
    let arr = ['isrows','isnotes','isindent','isline','isorder','isalias','isseparate','isconst','isconstructor','isbasic'];
    
    arr.forEach(item => {
      let tempArr = this.recordItem[item].filter(p => p.filename);
      this.recordItem[item] = tempArr.length ? tempArr : [new RecordItem()];
    });

    this.recordItem.createdAt = undefined;
  }

  postData() {
    this.getNotBlankList();

    this.http.post(environment.server + 'classes/Cr', this.recordItem).toPromise().then(response => response.json()).then(data => {
      this.getData();
    })
  }

  putData() {
    this.getNotBlankList();

    this.http.put(environment.server + 'classes/Cr/' + this.objId, this.recordItem).toPromise().then(response => response.json()).then(data => {
      this.getData();
    })
  }

  chooseUser(item) {
    item.username = this.users.filter(p => p.objectId === item.userid)[0].nickname;
  }

  deleteItem(list, i) {
    list.splice(i,1);
  }

  addItem(list) {
    list.push(new RecordItem());
  }
}
