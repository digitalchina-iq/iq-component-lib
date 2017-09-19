import { Component,Input } from '@angular/core';

@Component({
    selector: 'showitemo',
    templateUrl: 'showitemo.component.html',
    styleUrls: ['showitemo.component.scss']
})

export class ShowitemoComponent {
  @Input('sitemotitle') sitemoTitle: string;
  
}
