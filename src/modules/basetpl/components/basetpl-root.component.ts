import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  templateUrl: './basetpl-root.component.html'
})
export class BasetplRootComponent implements OnInit {
  constructor( private location:Location,
    private router: Router){
    }

    path = "";
    open: boolean;
    // textsuccess: false;
    textsuccess: boolean = true;
    mm="fffff";

    ngOnInit() {
      //  let _this = this;
      //  let reg = /demo\/widget\/page-style/;
      //  var resetPath = function(){
      //    _this.path=_this.location.path();
      //    _this.open = reg.test(_this.path);
      //  }
      //  this.router.events.subscribe(event => {
      //    console.log("123123")
      //    if (event instanceof NavigationEnd) {
      //      resetPath();
      //    }
      //  });
      //  resetPath();

       $('#sidebar ul li.has-sub > a').click(function(e) {
         e.preventDefault();
         $('#sidebar ul.dropdown-menu').slideUp(200);
         if($(this).next('ul.dropdown-menu').is(':hidden')) {
           $(this).next('ul.dropdown-menu').slideToggle(200);
         }
       });
   }
}
