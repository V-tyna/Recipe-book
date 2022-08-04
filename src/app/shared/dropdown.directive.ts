import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open')
  private isOpen = false;

  @HostListener('mouseenter') toggleOpen() {
    this.isOpen = true;
  }

  @HostListener('mouseleave') toggleClose() {
    this.isOpen = false;
  }
}
