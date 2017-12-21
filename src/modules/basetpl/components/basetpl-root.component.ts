import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { WindowService } from 'core';
import { BasetplService } from '../services/basetpl.service';

declare var $;

@Component({
  templateUrl: './basetpl-root.component.html'
})
export class BasetplRootComponent implements OnInit {
  constructor( 
    private windowService: WindowService,
    private basetplService: BasetplService,
    private location:Location,
    private router: Router){}

    path = "";
    menuList: any[] = [];

    ngOnInit() {
      this.basetplService.getNav().then(data => {
        this.menuList = data.results;
        setTimeout(this.setNav);
      })
      this.basetplService.getCodeReviewUser().then(data => {
        const USER_ORDER = ['隗合飞','郝建阳','郑柳燕','穆红敏','李晨','田玉平','齐少青','杨贵林'];
        let order = (USER_ORDER.indexOf(data.results[0].username)+1)%USER_ORDER.length;
        const CURRENT_USER = JSON.parse(window.localStorage.getItem('userinfo')).nickname;
        if(CURRENT_USER === USER_ORDER[order] && new Date(data.results[0].createdAt).getDate() !== new Date().getDate()){
          this.windowService.alert({message: '今天该你检查代码了', type: 'warn'});
        }
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
