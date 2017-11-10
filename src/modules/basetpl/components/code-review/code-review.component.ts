import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './code-review.component.html',
  styleUrls: ['./code-review.component.scss'],
  animations: [
    flyIn
  ]
})
export class CodeReviewComponent {
  recordList = [{date: '2017-11-09', name: '王迪'}];
  today: Date = new Date();
  DC_FES = ['王迪', '隗合飞', '郝建阳', '郑柳燕', '穆红敏', '李晨', '田玉平', '齐少青', '杨贵林'];

  constructor(){}

}
