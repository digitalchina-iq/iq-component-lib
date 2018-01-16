import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from 'animations/fly-in';
import * as moment from 'moment';

import { environment } from 'environments/environment';
import { WindowService } from 'core';

class Record {
  content: string;
  progress: string;
}

class PlanRecord {
  time: string;
  thisrecord: Record[] = [new Record()];
  nextrecord: Record[] = [new Record()];
  degree: string;
  ndegree: string;
}

class UserPlan {
  objectId: string;
  userid: string;
  username: string;
  file: PlanRecord[];
}

@Component({
  templateUrl: './plan-tracking.component.html',
  styleUrls: ['./plan-tracking.component.scss'],
  animations: [
    flyIn
  ]
})
export class PlanTrackingComponent implements OnInit{

  today: string = moment().format('YYYY-MM-DD');
  newRecord: PlanRecord;
  planList: UserPlan[] = [];
  loading: boolean;
  id: string;
  hasSubmitted: boolean;

  constructor(private http: Http, private windowService: WindowService){}

  ngOnInit() {
    this.initNewRecord();
    this.initData();
  }

  initNewRecord(){
    this.newRecord = new PlanRecord();
    this.newRecord.time = this.today;
  }

  initData() {
    this.loading = true;
    this.http.get(environment.server + 'classes/Pt', {params: {order: '-createdAt'}}).toPromise().then(response => response.json()).then(data => {
      this.loading =false;
      this.planList = data.results;
      this.planList.forEach(item => {
        item.file.sort((p, c) => moment(c.time).valueOf() - moment(p.time).valueOf());
      })
      this.id = this.planList[0].objectId;//初始化id为第一个人的id
      this.getNotTodyRecord();
    })
  }

  /**获取以前提交的记录内容*/
  getNotTodyRecord(submit: boolean = false): Array<PlanRecord>{
    let recordArr = this.planList.filter(item => item.objectId === this.id)[0].file || [];
    let notTodayRecordArr = recordArr.filter(item => item.time !== this.today);
    this.hasSubmitted = notTodayRecordArr.length < recordArr.length;
    let len = notTodayRecordArr.length;
    if(!this.hasSubmitted && notTodayRecordArr[len-1] && !submit) {
      this.newRecord.thisrecord = JSON.parse(JSON.stringify(notTodayRecordArr[len-1].nextrecord));
    }
    return notTodayRecordArr.concat(this.newRecord);
  }

  checkDate() {
    if(this.newRecord.time === this.today) {
      this.getNotTodyRecord();
    } else {
      this.hasSubmitted = false;
      this.newRecord.thisrecord = [new Record()];
    }
  }

  /**获取用户id*/
  getUserId(e){
    this.id = e;
    this.initNewRecord();
    this.getNotTodyRecord();
  }

  deleteItem(list, i) {
    list.splice(i,1);
  }

  addItem(list) {
    list.push(new PlanRecord());
  }

  save() {
    this.loading = true;
    let requsetBody = this.getNotTodyRecord(true);
    this.planList.length = 0;
    this.http.put(environment.server + 'classes/Pt/' + this.id, {file:requsetBody}).toPromise().then(response => response.json).then(data => {
      this.loading = false;
      this.windowService.alert({message: '提交成功', type: 'success'});
      this.initData();
    })
  }

}