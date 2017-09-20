import { Component,Input,OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'showitemexample',
    templateUrl: 'showitemexample.component.html',
    styleUrls: ['showitemexample.component.scss']
})

export class ShowitemexampleComponent implements OnInit{
  ngOnInit() {
    $(".showtemwizard").bwizard();
  }

}
