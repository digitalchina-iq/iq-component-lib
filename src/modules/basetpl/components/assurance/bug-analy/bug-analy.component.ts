import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from 'animations/fly-in';

import { environment } from 'environments/environment';
import { WindowService } from 'core';
import { Pager } from 'shared/index';

declare var window;

class BugRecord {
  describe: string;
  username: string;
  type: string;
  grade: string;
  project: string;
  triggerdate: string;
}

@Component({
  templateUrl: './bug-analy.component.html',
  styleUrls: ['./bug-analy.component.scss'],
  animations: [
    flyIn
  ]
})
export class BugAnalyComponent implements OnInit {
  loading: boolean;
  objId: string;
  bugList: BugRecord[] = [];
  newBug: BugRecord = new BugRecord();
  pager: Pager = new Pager();

  constructor(private http: Http, private windowService: WindowService){}

  ngOnInit() {

  }

  /**获取记录数据列表*/
  getData() {
    this.loading = true;
    this.http.get(environment.server + 'classes/Bugma', {params:{order: '-createdAt', limit: this.pager.pageSize, skip: (this.pager.pageNo - 1) * this.pager.pageSize, count: 1}}).toPromise().then(response => response.json()).then(data => {
      this.loading = false;
      let all = data.count;
      this.pager.set({
        total: all,
        totalPages: Math.ceil(all / this.pager.pageSize)
      })
      this.bugList = data.results;
    });
  }

  //切换分页
  pagerChange(e: Pager) {
    this.pager.pageNo = e.pageNo;
    this.pager.pageSize = e.pageSize;

    this.getData();
  }

  //提交数据
  postData() {
  }

  //更新数据
  putData() {
  }
}
