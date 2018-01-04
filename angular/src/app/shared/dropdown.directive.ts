import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input('appDropdownMenu') appDropdownMenu: ElementRef;
  isMenuOpen: boolean = false;

  constructor(private render: Renderer2) { }

  @HostListener('click') toggleMenu() {
    if (this.isMenuOpen) {
      this.render.removeClass(this.appDropdownMenu, 'show');
    }
    else {
      this.render.addClass(this.appDropdownMenu, 'show');
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

}
