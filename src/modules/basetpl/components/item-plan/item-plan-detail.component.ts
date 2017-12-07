import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from 'environments/environment';
import { XcModalService, XcModalRef } from 'shared/modules/index';
import { WindowService } from 'core';

class ItemPlan {
  objectId: string;
  content: string;
  days: number;
  closedate: string;
  overid: string;
}

let cache: any = {};

@Component({
  templateUrl: './item-plan-detail.component.html',
  styles: ['button[disabled]{background:#ccc;}']
})
export class ItemPlanDetailComponent implements OnInit {

  modal: XcModalRef;
  itemPlan: Array<ItemPlan>;
  isNew: boolean;
  isEdit: boolean;
  loading: boolean;
  objectName: string;
  isDisabled: boolean;
  overId: string;

  constructor(
    private http: Http,
    private windowService: WindowService,
    private xcModalService: XcModalService) {}

  ngOnInit() {
    this.modal = this.xcModalService.getInstance(this);
    this.modal.onShow().subscribe((data?) => {
      if(!data) {
        this.isNew = true;
        this.itemPlan = [new ItemPlan()];
      }else{
        this.isNew =false;
        this.overId = data.objectId;
        this.objectName = data.taskname;
        if(cache[data.objectId]) {
          this.itemPlan = JSON.parse(JSON.stringify(cache[data.objectId]));
          return;
        };
        this.loading = true;
        this.http.get(environment.server + `cloudQuery?cql=select * from Overalldtl where overid='${data.objectId}'`).toPromise().then(response => response.json()).then(res => {
          this.loading = false;
          cache[data.objectId] = res.results;
          this.itemPlan = JSON.parse(JSON.stringify(cache[data.objectId]));
        })
      }

    })
  }

  hide(data?) {
    this.modal.hide(data);

    this.itemPlan.length = 0;
    this.objectName = '';
    this.isEdit = false;
    this.loading = false;
    this.isDisabled = false;
  }

  addItem() {
    this.itemPlan.push(new ItemPlan());
  }

  deleteItem(item: ItemPlan, i) {
    if(this.itemPlan.length > 1) {
      this.itemPlan.splice(i, 1);
      if(item.objectId) {
        this.http.delete(environment.server + 'classes/Overalldtl/' + item.objectId).toPromise();
      }
    }
  }

  save() {
    this.isDisabled = true;

    let callBack = (id) => {
      cache[id] = '';

      let proList = [];

      this.itemPlan.forEach(item => {

        let tempItem = {days: item.days, closedate: item.closedate, content: item.content, overid: id};

        if(item.objectId) {
          proList.push(this.http.put(environment.server + 'classes/Overalldtl/' + item.objectId, tempItem).toPromise().then(response => response.json()));
        } else {
          proList.push(this.http.post(environment.server + 'classes/Overalldtl', tempItem).toPromise().then(response => response.json()));
        }

      });

      Promise.all(proList).then(data => {
        this.isDisabled = false;

        if(data) {
          if(this.isNew) {
            this.hide(true);
          } else {
            this.isEdit = false;
          }
        }
      })
    }

    if(!this.isNew){
      callBack(this.overId);
      return;
    };
    if(!this.objectName) {
      this.windowService.alert({message: '请先输入项目名称', type: 'fail'});
      this.isDisabled = false;
      return;
    }
    this.http.post(environment.server + 'classes/Overall', {taskname: this.objectName}).toPromise().then(response => response.json()).then(data => {
      callBack(data.objectId);
    });
  }

  edit() {
    this.isEdit = true;
    if(!this.itemPlan.length){
      this.itemPlan.push(new ItemPlan());
    }
  }

  cancel() {
    this.isEdit = false;
  }
}