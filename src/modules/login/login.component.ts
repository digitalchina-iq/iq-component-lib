import { Component, OnInit } from '@angular/core';
import * as AV from 'leancloud-storage';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class DefindexComponent implements OnInit {

  ngOnInit() {
    console.log(AV);

    const appId = 'FiwsYyo5ilGwbj1NJ1b2Ub3c-gzGzoHsz';
    const appKey = 'ALC3hN40oHBH7Fke3RJXvvsO';
    AV.init({ appId, appKey });
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
