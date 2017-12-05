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
    this.newRecord.time = moment().format('YYYY-MM-DD');
  }

  initData() {
    this.loading = true;
    this.http.get(environment.server + 'classes/Pt').toPromise().then(response => response.json()).then(data => {
      this.loading =false;
      this.planList = data.results;
      this.id = this.planList[0].objectId;
      this.getNotTodyRecord();      
    })
  }

  getNotTodyRecord(): Array<PlanRecord>{
    let recordArr = this.planList.filter(item => item.objectId === this.id)[0].file || [];
    let notTodayRecordArr = recordArr.filter(item => item.time !== this.newRecord.time);
    this.hasSubmitted = notTodayRecordArr.length < recordArr.length;
    if(!this.hasSubmitted && notTodayRecordArr[0]) {
      this.newRecord.thisrecord = JSON.parse(JSON.stringify(notTodayRecordArr[0].nextrecord));
    }
    return notTodayRecordArr.concat(this.newRecord);
  }

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
    let requsetBody = this.getNotTodyRecord();
    this.planList.length = 0;
    this.http.put(environment.server + 'classes/Pt/' + this.id, {file:requsetBody}).toPromise().then(response => response.json).then(data => {
      this.loading = false;
      this.windowService.alert({message: '提交成功', type: 'success'});
      this.initData();
    })
  }

}