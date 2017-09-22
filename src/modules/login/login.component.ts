import { Component, OnInit } from '@angular/core';
import * as AV from 'leancloud-storage';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class DefindexComponent implements OnInit {

  ngOnInit() {
    console.log(AV);

    //  console.log(this.av)
    // var TestObject = AV.Object.extend('TestObject');
    // var testObject = new TestObject();
    // testObject.save({
    //   words: 'Hello World!'
    // }).then(function(object) {
    //   alert('LeanCloud Rocks!');
    // })
  }


}
