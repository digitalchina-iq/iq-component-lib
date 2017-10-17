import { Component, OnInit } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: 'loading.component.html',
  animations: [
    flyIn
  ]
})

export class LoadingDemoComponent implements OnInit {

  ngOnInit() {

  }

}
