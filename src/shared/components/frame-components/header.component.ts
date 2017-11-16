import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var window,$;
@Component({
  selector: 'iq-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  scolor: string= window.localStorage.getItem("scolor")==null?"#444":window.localStorage.getItem("scolor");
  ecolor: string= window.localStorage.getItem("ecolor")==null?"#20A8E8":window.localStorage.getItem("ecolor");
  nickname: string= JSON.parse(localStorage.getItem("userinfo"))==null?"未知":JSON.parse(localStorage.getItem("userinfo")).nickname;

  constructor(private router: Router) {
    
  }

  ngOnInit() {

  }

  scolorm(e){
    window.localStorage.setItem("scolor",this.scolor);
    $("body").css("background","linear-gradient(135deg,"+this.scolor+" 0,"+this.ecolor+" 100%)");
  }

  ecolorm(e){
    window.localStorage.setItem("ecolor",this.ecolor);
    $("body").css("background","linear-gradient(135deg,"+this.scolor+" 0,"+this.ecolor+" 100%)");
  }

  logout(){
    window.localStorage.removeItem('userinfo');
    this.router.navigate(["/"]);
  }

}
