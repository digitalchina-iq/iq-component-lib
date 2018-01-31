import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { flyIn } from 'animations/fly-in';

import { environment } from 'environments/environment';
import { WindowService } from 'core';
import { Pager } from 'shared/index';
import { XcModalRef, XcModalService } from 'shared/modules';

import { EditBugListItemComponent } from '../edit-buglist-item/edit-buglist-item.component';

declare var window;

export const BUG_TYPE: Array<{type: string, childType: string[]}> = [
  {type: 'css', childType: ['不规范', '兼容', '大布局']},
  {type: '需求理解', childType: ['理解偏差', '需求不明确']},
  {type: 'angular', childType: ['不规范', '兼容']},
  {type: '架构', childType: ['不稳定', '单点登录']},
  {type: '测试', childType: ['测试不准确', '理解偏差']},
  {type: '后端', childType: ['权限', '接口不完整']}
];

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
  pageSize: number = 10;
  pageNo: number = 1;
}

@Component({
  templateUrl: './bug-analy-item.component.html',
  styleUrls: ['./bug-analy-item.component.scss'],
  animations: [
    flyIn
  ]
})
export class BugAnalyItemComponent implements OnInit {
  id: string;
  loading: boolean;
  users: any[];
  modal: XcModalRef;
  bugList: BugRecord[] = [];
  newBug: BugRecord = new BugRecord();
  pager: Pager = new Pager();
  query: BugRecord = new BugRecord();
  bugType: Array<{type: string, childType: string[]}> = BUG_TYPE;
  imgSrc: string;
  imgLoading: boolean;
  childType: string[];
  queryChildType: string[];
  fileUploadUrl: string = environment.server + 'files/upload';
  mousePosition: {x: number, y: number};

  @ViewChild('fileUpload') fileUpload: any;
  @ViewChild('img') img: ElementRef;

  constructor(
    private http: Http,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private xcModalService: XcModalService,
    private windowService: WindowService){}

  ngOnInit() {
    this.newBug.state = '新建';
    this.newBug.triggerdate = moment().format('YYYY-MM-DD');
    this.id = this.activedRoute.snapshot.params['id'];
    this.http.get(environment.server + 'users').toPromise().then(response => response.json()).then(data => {
      this.users = data.results;
    });

    this.query = Object.assign(this.query, this.activedRoute.snapshot.queryParams);

    this.modal = this.xcModalService.createModal(EditBugListItemComponent);
    this.modal.onHide().subscribe(data => {
      if(data){
        this.getData();
      }
    });
  }
  
  //查看图表
  viewChart() {
    this.router.navigate(['index/assurance/bug-statistic', this.id]);
  }

  //切换分页
  pagerChange(e: Pager) {
    this.query.pageNo = e.pageNo;
    this.query.pageSize = e.pageSize;

    this.getData();
  }

  //切换bug类型
  bugTypeChange(e) {
    this.childType = this.bugType.filter(item => item.type === e)[0].childType;
    this.newBug.childtype = this.childType[0];
  }

  queryTypeChange(e) {
    this.queryChildType = this.bugType.filter(item => item.type === e)[0].childType;
    this.query.childtype = undefined;
  }

  //增加数据
  add() {
    this.newBug.pid = this.id;
    this.http.post(environment.nodeServer + `bug-item/${this.id}`, this.newBug).map(res => res.json()).subscribe(data => {
      this.getData();
      this.newBug = new BugRecord();
      this.clearFile();
      this.newBug.state = '新建';
      this.newBug.triggerdate = moment().format('YYYY-MM-DD');
    })
  }

  edit(item: BugRecord){
    this.modal.show({config: {users: this.users, bugType: this.bugType}, record: item})
  }

  delete(item: BugRecord){
    this.windowService.confirm({message: '确定删除？'}).subscribe(v => {
      if(v){
        this.http.delete(environment.nodeServer + 'bug-item-detail/' + item.id).subscribe(data => {
          this.getData();
        })
      }
    })
  }

  getData() {
    this.loading = true;
    this.http.get(environment.nodeServer + `bug-item/${this.id}`, {params: this.query}).subscribe(result => {
      let data = result.json();
      this.loading = false;
      this.pager.set(data.pager)
      this.bugList = data.results;
    })
  }

  search() {
    this.pager.pageNo = 1;
    this.getData();
  }

  reset() {
    this.query = new BugRecord();
  }

  goBack() {
    this.router.navigate(['index/assurance/bug-analy']);
  }

  fileUploadSuccess(e) {
    this.newBug.file.push({name: e.name, url: e.url})
  }

  clearFile() {
    this.newBug.file.length = 0;
    this.fileUpload.uploader.queue.length = 0;
  }

  loadImage(ev, url: string) {
    this.mousePosition = {x: ev.clientX, y: ev.clientY};
    this.imgSrc = url;
    this.imgLoading = !this.img.nativeElement.complete
  }

  imgLoaded() {
    this.imgLoading = false;

    let parentEle = this.img.nativeElement.parentElement,
        top = this.mousePosition.y - parentEle.offsetHeight/2;
    if(top < 0) {top = 0};
    if(top > window.innerHeight - parentEle.offsetHeight) {top = window.innerHeight - parentEle.offsetHeight};
    parentEle.style.right = window.innerWidth - this.mousePosition.x + 30 + 'px';
    parentEle.style.top = top + 'px';
  }
}
