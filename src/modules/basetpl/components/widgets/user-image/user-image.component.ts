import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: 'user-image.component.html',
  animations: [
    flyIn
  ]
})

export class UserImageDemoComponent implements OnInit {

  someone: string = '8a81e6ab5b4730e4015b473be1cd0005';

  ngOnInit() {
  }

  deleteSomeOne() {
    console.log('点击了删除按钮');
  }

}
