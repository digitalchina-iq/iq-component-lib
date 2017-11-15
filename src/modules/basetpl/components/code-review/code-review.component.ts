import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from 'animations/fly-in';
import * as moment from 'moment';

import { environment } from 'environments/environment';

class IsRows {
  filename:string;
  userid:string;
  username:string;
}

class Record {
  createdAt: string;
  objectId: string;
  userid: string;
  isrows: IsRows[];
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
  recordItem: Record = new Record();
  users: any[];

  constructor(private http: Http){}

  ngOnInit() {
    this.today = moment().format('YYYY-MM-DD');
    this.recordItem.isrows = [new IsRows()];
    this.http.get(environment.server + 'users').toPromise().then(response => response.json()).then(data => {
      this.users = data.results;
    })
    this.getData();
  }

  getData() {
    this.loading = true;
    this.http.get(environment.server + 'classes/Cr').toPromise().then(response => response.json()).then(data => {
      this.loading = false;
      this.recordList = data.results;
console.log(data)
      let lastRecord = this.recordList[this.recordList.length - 1];
      if(moment(lastRecord.createdAt).format('YYYY-MM-DD') === this.today) {
        this.objId = lastRecord.objectId;
      }
    })
  }

  postData() {
    this.http.post(environment.server + 'classes/Cr', this.recordItem).toPromise().then(response => response.json()).then(data => {
      this.getData();
    })
  }

  putData() {
    this.http.put(environment.server + 'classes/Cr/' + this.objId, this.recordItem).toPromise().then(response => response.json()).then(data => {
      this.getData();
    })
  }

  chooseUser() {
    this.recordItem.isrows.forEach(item => {
      item.username = this.users.filter(p => p.objectId === item.userid)[0].nickname;
    })
  }

  deleteIsRows(i) {
    this.recordItem.isrows.splice(i,1);
  }

  addIsRows() {
    this.recordItem.isrows.push(new IsRows());
  }
}
