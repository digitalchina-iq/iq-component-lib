import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { BasetplService } from '../services/basetpl.service';

declare var $;

@Component({
  templateUrl: './basetpl-root.component.html'
})
export class BasetplRootComponent implements OnInit {
  constructor( 
    private basetplService: BasetplService,
    private location:Location,
    private router: Router){}

    path = "";
    menuList: any[] = [];

    ngOnInit() {
       this.basetplService.getNav().then(data => {
         console.log(data);
         this.menuList = data.results;
         setTimeout(this.setNav);
       })
   }

   setNav() {
     $('#sidebar ul li.has-sub > a').click(function(e) {
       e.preventDefault();
       $('#sidebar ul.dropdown-menu').slideUp(200);
       if($(this).next('ul.dropdown-menu').is(':hidden')) {
         $(this).next('ul.dropdown-menu').slideToggle(200);
       }
     });
   }
}
