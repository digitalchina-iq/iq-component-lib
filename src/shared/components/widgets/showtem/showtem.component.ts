import { Component, Input , OnInit} from '@angular/core';
declare var $: any;

@Component({
    selector: 'showtem',
    templateUrl: 'showtem.component.html',
    styleUrls: ['showtem.component.scss']
})

export class ShowtemComponent implements OnInit {
  @Input('stname') stName: string;
  @Input('stnamedel') stNameDel: string;

  ngOnInit() {
    $("#wizard").bwizard();
  }

}
