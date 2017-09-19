import { ElementRef, HostListener, Directive } from '@angular/core';

declare var window;
declare var $;

@Directive({
    selector: '[stopParentClick]'
})
export class StopParentClick {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.cursor = "default";
  }

  @HostListener('click') onEvent(ev?) {

    ev = ev || window.event;
    ev.stopPropagation?ev.stopPropagation():(ev.cancelBubble = true);

    //新建事件，跳过父级触发事件
    let e = new Event('click');
    $(this.el.nativeElement.parentNode).parents().each(function(){
      this.dispatchEvent(e);
    });
    window.dispatchEvent(e);

    return false;
  }


}
