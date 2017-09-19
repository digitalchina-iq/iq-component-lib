import { Component, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './basetpl-container.component.html',
  styleUrls: ['./basetpl-container.component.scss']
})
export class BasetplContainerComponent {
  //服务注入 当前路由服务
  constructor(private route: ActivatedRoute) { }
}
