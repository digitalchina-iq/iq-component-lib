import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { flyIn } from 'animations/fly-in';

import { environment } from 'environments/environment';
import { WindowService } from 'core';
import { Pager } from 'shared/index';
import { XcModalRef, XcModalService } from 'shared/modules';

import { EditBugListItemComponent } from '../edit-buglist-item/edit-buglist-item.component';

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
  file: Array<{name: string, url: string}> = [];
}

@Component({
  templateUrl: './bug-analy-item.component.html',
  styleUrls: ['./bug-analy-item.component.scss'],
  animations: [
    flyIn
  ]
})
export class BugAnalyItemComponent implements OnInit {
  loading: boolean;
  objId: string;
  users: any[];
  modal: XcModalRef;
  bugList: BugRecord[] = [];
  newBug: BugRecord = new BugRecord();
  pager: Pager = new Pager();
  query: BugRecord = new BugRecord();
  bugType: Array<{type: string, childType: string[]}> = [
    {type: 'css', childType: ['不规范', '兼容', '大布局']},
    {type: '需求理解', childType: ['理解偏差', '需求不明确']},
    {type: 'angular', childType: ['不规范', '兼容']},
    {type: '架构', childType: ['不稳定', '单点登录']},
    {type: '测试', childType: ['测试不准确', '理解偏差']},
    {type: '后端', childType: ['权限', '接口不完整']}
  ];
  imgSrc: string;
  imgLoading: boolean;
  childType: string[];
  queryChildType: string[];
  fileUploadUrl: string = environment.server + 'files/upload';

  @ViewChild('fileUpload') fileUpload: any;
  @ViewChild('img') img: ElementRef;

  constructor(
    private http: Http,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private xcModalService: XcModalService,
    private windowService: WindowService){}

  ngOnInit() {
    console.log(this.fileUpload);
    this.objId = this.activedRoute.snapshot.params['id'];
    this.http.get(environment.server + 'users').toPromise().then(response => response.json()).then(data => {
      this.users = data.results;
    });

    this.modal = this.xcModalService.createModal(EditBugListItemComponent);
    this.modal.onHide().subscribe(data => {
      if(data){
        this.getData();
      }
    })
  }

  /**获取记录数据列表*/
  getData() {
    this.loading = true;
    this.http.get(environment.server + `cloudQuery?cql=select count(*), * from Bugma where pid='${this.objId}' limit ${this.pager.pageSize * (this.pager.pageNo - 1)},${this.pager.pageSize} order by createdAt`).toPromise().then(response => response.json()).then(data => {
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
    this.newBug.pid = this.objId;
    this.http.post(environment.server + 'classes/Bugma', this.newBug).map(res => res.json()).subscribe(data => {
      this.getData();
      this.newBug = new BugRecord();
      this.clearFile();
    })
  }

  edit(item: BugRecord){
    this.modal.show({config: {users: this.users, bugType: this.bugType}, record: item})
  }

  delete(item: BugRecord){
    this.windowService.confirm({message: '确定删除？'}).subscribe(v => {
      if(v){
        this.http.delete(environment.server + 'classes/Bugma/' + item.objectId).subscribe(data => {
          this.getData();
        })
      }
    })
  }

  search() {
    let queryObj = {};
    for(let i in this.query){
      let val = this.query[i];
      if(val || val === 0){
        queryObj[i] = val;
      }
    }
    this.loading = true;
    this.http.get(environment.server + `classes/Bugma`, {params: {limit: this.pager.pageSize, skip: (this.pager.pageNo - 1) * this.pager.pageSize, count: 1, where: Object.assign({pid: this.objId}, queryObj)}}).subscribe(result => {
      let data = result.json();
      this.loading = false;
      let all = data.count;
      this.pager.set({
        total: all,
        totalPages: Math.ceil(all / this.pager.pageSize)
      })
      this.bugList = data.results;
    })
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
    console.log(this.img);
    let nativeEle = this.img.nativeElement;
    let parentStyle = nativeEle.parentElement.style;
    parentStyle.right = window.innerWidth - ev.clientX + 30 + 'px';
    parentStyle.top = ev.clientY - 100 + 'px';
    this.imgSrc = url;
    this.imgLoading = !nativeEle.complete
  }
}
