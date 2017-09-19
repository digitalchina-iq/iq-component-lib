import { Directive, ElementRef, Input,Renderer } from '@angular/core'
//引入highlight高亮
// import { hljs } from 'highlight.js'
// import * as hljs from 'highlight.js/lib/index.js';

// import { * } from 'bootstrap'
// import hljs from 'highlight.js/lib/highlight.js';
import 'highlight.js/lib/highlight.js';
import 'highlight.js/styles/googlecode.css'

declare var hljs,window,document;

@Directive({ selector: '[iqhighlight]'})
export class TestDirective {
    constructor(
      private el: ElementRef,
      private renderer: Renderer
    ){
      // console.log(el);

          // let blocks = el.nativeElement.querySelectorAll('pre code');
          //
          // console.dir(blocks);
          //
          // blocks.forEach((block)=>{
          //   hljs.highlightBlock(block)
          // })


          //
          // console.dir(blocks);

          // setTimeout(() => {
          //     let blocks = el.nativeElement.querySelectorAll('pre code');
          //     console.dir(blocks);
          //     blocks.forEach((block)=>{
          //       hljs.highlightBlock(block)
          //     })
          //  }, 0);
    }

    // constructor(x) {
    //
    //   }

    // setTimeout(() => {
    //     let blocks = el.nativeElement.querySelectorAll('pre code');
    //     blocks.forEach((block)=>{
    //       hljs.highlightBlock(block)
    //     })
    //  }, 0);

    ngAfterViewInit() {

      // console.dir(this);


      // console.dir(this.el);

      let blocks = this.el.nativeElement.querySelectorAll('pre code');
      blocks.forEach((block)=>{
        hljs.highlightBlock(block)
      })
      // this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', 'red');
      // this.renderer.setText(this.el.nativeElement,"adsdasdasd")


      //this.renderer.setElementClass(this.el.nativeElement, "ffffff", true);
      // let blocks = this.renderer.selectRootElement('code')
      // blocks.forEach((block)=>{
      //   hljs.highlightBlock(block)
      // })

      // this.renderer.listen(this.el.nativeElement,'pre code', function(e){
      //   alert("xxxx");
      // })



// this.renderer.setElementClass(this.el.nativeElement, "ffffff", true);
    // console.log(  this.renderer.selectRootElement('div') );
  // console.log(this.renderer.projectNodes(this.el.nativeElement.querySelectorAll('pre code')))


    }

    // @ViewChild('greet')
    // greetDiv: ElementRef;
    //
    // ngAfterViewInit() {
    //   this.greetDiv.nativeElement.style.backgroundColor = 'red';
    // }

}
