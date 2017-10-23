import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';
import { Pager } from 'shared/index';

@Component({
  templateUrl: 'iq-pager.component.html',
  animations: [
    flyIn
  ]
})

export class IqPagerDemoComponent implements OnInit {

  pagerData: Pager = new Pager();

  ngOnInit() {
    this.pagerData.set({pageSize:10,pageNo:2,total:123,totalPages:12});

  }

  pageChange(e) {
    this.pagerData.set(e);
  }
}
