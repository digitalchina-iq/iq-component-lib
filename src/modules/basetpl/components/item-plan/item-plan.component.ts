import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { flyIn } from 'animations/fly-in';
import * as moment from 'moment';

import { environment } from 'environments/environment';
import { WindowService } from 'core';
import { XcModalService, XcModalRef } from 'shared/modules/index';

import { ItemPlanDetailComponent } from './item-plan-detail.component';

@Component({
  templateUrl: './item-plan.component.html',
  styleUrls: ['./item-plan.component.scss'],
  animations: [
    flyIn
  ]
})
export class ItemPlanComponent implements OnInit{

  modal: XcModalRef;
  planList: any[] = [];
  loading: boolean;
  id: string;
  hasSubmitted: boolean;

  constructor(
    private http: Http,
    private xcModalService: XcModalService,
    private windowService: WindowService){}

  ngOnInit() {
    this.initData();

    this.modal = this.xcModalService.createModal(ItemPlanDetailComponent);
    this.modal.onHide().subscribe(data => {
      if(data){
        this.initData();
      }
    })
  }

  initData() {
    this.http.get(environment.server + 'classes/Overall').toPromise().then(response => response.json()).then(data => {
      this.planList = data.results;
    })
  }

  showItem(item?: string) {
    this.modal.show(item);
  }

}