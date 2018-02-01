import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { flyIn } from 'animations/fly-in';

import { environment } from 'environments/environment';
import { WindowService } from 'core';

declare var window;

class BugItem {
  describe: string;
  objectId: string;
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
  itemList: BugItem[] = [];

  constructor(
    private http: Http,
    private router: Router,
    private windowService: WindowService){}

  ngOnInit() {
    this.getData();
  }

  /**获取记录数据列表*/
  getData() {
    this.loading = true;
    this.http.get(environment.nodeServer + 'bug-items')
             .toPromise().then(response => response.json())
             .then(data => {
                this.loading = false;
                if(data.success) {
                  this.itemList = data.results;
                } else {
                  this.windowService.alert({message: data.message, type: 'fail'})
                }
              });
  }

  //新增
  addNewItem() {
    this.windowService.prompt({message: '请输入项目名称'}).subscribe(v => {
      if(!v){return};
      this.http.post(environment.nodeServer + 'bug-items', {name: v})
               .map(response => response.json())
               .subscribe(data => {
                 this.getData();
               })
    })
  }

  //查看详情
  showDetail(id: string) {
    this.router.navigate(['index/assurance/bug-analy', id]);
  }
}
