import { Component, OnInit } from '@angular/core';
import * as AV from 'leancloud-storage';
declare var window,$;
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

    const scolor = window.localStorage.getItem("scolor")==null?"#444":window.localStorage.getItem("scolor");
    const ecolor = window.localStorage.getItem("ecolor")==null?"#20A8E8":window.localStorage.getItem("ecolor");



    $("body").css("background","linear-gradient(135deg,"+scolor+" 0,"+ecolor+" 100%)");



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
