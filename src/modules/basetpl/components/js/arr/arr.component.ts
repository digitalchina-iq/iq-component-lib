import { Component } from '@angular/core';
import { flyIn } from 'animations/fly-in';

@Component({
  templateUrl: './arr.component.html',
  animations: [
    flyIn
  ]
})
export class ArrJsComponent {

  uniqueArr(arr: any[]): any[] {
    return Array.from(new Set(arr));
  }

  sortArr(arr: any[]): any[] {
    return arr.sort((a,b)=> a - b);
  }

  sequenceArr(start: number, end: number) {
    return Array.from({length: end - start + 1}).map((v,i) => i + start)
  }

  uniqueBbyA(b: any[], a: any[]) {
    return b.filter(item => !a.some(v => v === item));
  }
}