import { Component, OnInit } from '@angular/core';
import * as AV from 'leancloud-storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
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
