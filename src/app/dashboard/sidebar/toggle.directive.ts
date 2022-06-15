import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';

/**
 * Simple directive which toggles a css class on click. Default is 'open'
 */

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective implements OnInit {
  @Input() useParent ? = true;
  @Input() appToggle = 'c-show';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // tslint:disable-next-line: curly
    if (this.appToggle === '') this.appToggle = 'c-show';
  }

  @HostListener('click')
  onClick() {
    const el = this.useParent ? this.el.nativeElement.parentNode : this.el.nativeElement;
    if (el.classList.contains(this.appToggle)) {
      this.renderer.removeClass(el, this.appToggle);
    } else {
      this.renderer.addClass(el, this.appToggle);
    }
  }
}
