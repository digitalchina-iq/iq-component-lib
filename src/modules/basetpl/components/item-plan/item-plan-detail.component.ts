import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from 'environments/environment';
import { XcModalService, XcModalRef } from 'shared/modules/index';

class ItemPlan {
  content: string;
  days: number;
  cloesdate: string;
}

let cache: any = {};

@Component({
  templateUrl: './item-plan-detail.component.html'
})
export class ItemPlanDetailComponent implements OnInit {

  modal: XcModalRef;
  itemPlan: Array<ItemPlan>;
  isNew: boolean;

  constructor(
    private http: Http,
    private xcModalService: XcModalService) {}

  ngOnInit() {
    this.modal = this.xcModalService.getInstance(this);
    this.modal.onShow().subscribe((data?) => {
      console.log(data);
      this.isNew = !data;

      if(data) {
        if(cache[data]) {this.itemPlan = cache[data];return};
        this.http.get(environment.server + `cloudQuery?cql=select * from Overalldtl where overid='${data}'`).toPromise().then(response => response.json()).then(res => {
          console.log(res);
          this.itemPlan = res.results;
          cache[data] = res.results;
        })
      }else{
        this.itemPlan = [new ItemPlan()];
      }
    })
  }

  hide() {
    this.modal.hide();
  }
}