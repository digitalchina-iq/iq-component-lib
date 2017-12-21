import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from 'animations/fly-in';
import * as moment from 'moment';

import { environment } from 'environments/environment';
import { WindowService } from 'core';
import { Pager } from 'shared/index';

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
  pager: Pager = new Pager();

  constructor(private http: Http, private windowService: WindowService){}

  ngOnInit() {
    this.recordItem = new Record();
    this.getUser();

    this.today = moment().format('YYYY-MM-DD');
    this.http.get(environment.server + 'users').toPromise().then(response => response.json()).then(data => {
      this.users = data.results;
    })
  }

  /**获取登录人信息*/
  getUser() {
    let userInfo = JSON.parse(window.localStorage.getItem('userinfo'));

    this.recordItem.userid = userInfo ? userInfo.objectId : '';
    this.recordItem.username = userInfo ? userInfo.nickname : '请先登录';
  }

  /**获取记录数据列表*/
  getData() {
    this.loading = true;
    this.http.get(environment.server + 'classes/Cr', {params:{order: '-createdAt', limit: this.pager.pageSize, skip: (this.pager.pageNo - 1) * this.pager.pageSize, count: 1}}).toPromise().then(response => response.json()).then(data => {
      this.loading = false;
      this.recordList = data.results;
      let all = data.count;
      this.pager.set({
        total: all,
        totalPages: Math.ceil(all / this.pager.pageSize)
      })

      let lastRecord = this.recordList[0];
      if(!lastRecord){return};
      if(moment(lastRecord.createdAt).format('YYYY-MM-DD') === this.today) {
        this.objId = lastRecord.objectId;
        Object.assign(this.recordItem, JSON.parse(JSON.stringify(lastRecord)));
        this.getNotBlankList();
        this.getUser();
      }
    })
  }

  //切换分页
  pagerChange(e: Pager) {
    this.pager.pageNo = e.pageNo;
    this.pager.pageSize = e.pageSize;

    this.getData();
  }

  //获取并设置非空列表
  getNotBlankList() {
    let arr = ['isrows','isnotes','isindent','isline','isorder','isalias','isseparate','isconst','isconstructor','isbasic'];
    let validArr = [];
    arr.forEach(item => {
      let tempArr = this.recordItem[item].filter(p => p.filename && p.filename !== '是');
      validArr.push(tempArr.some(v => v.filename && !v.userid));
      this.recordItem[item] = tempArr.length ? tempArr : [new RecordItem()];
    });
    
    this.recordItem.createdAt = undefined;

    return !validArr.some(item => item);

  }

  //提交数据
  postData() {
    if(!this.getNotBlankList()){
      this.windowService.alert({message: '请选择文件对应的人员', type: 'fail'});
      return;
    }

    this.http.post(environment.server + 'classes/Cr', this.recordItem).toPromise().then(response => response.json()).then(data => {
      this.getData();
    })
  }

  //更新数据
  putData() {
    if(!this.getNotBlankList()){
      this.windowService.alert({message: '请选择文件对应的人员', type: 'fail'});
      return;
    }

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
