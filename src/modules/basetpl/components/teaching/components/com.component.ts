import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from 'animations/fly-in';
import * as moment from 'moment';

import { environment } from 'environments/environment';
import { WindowService } from 'core';

@Component({
  templateUrl: './com.component.html',
  // styleUrls: ['./plan-tracking.component.scss'],
  animations: [
    flyIn
  ]
})
export class ComComponent implements OnInit{

  constructor(private http: Http, private windowService: WindowService){}

  ngOnInit() {
    // this.initNewRecord();
    // this.initData();
  }

}