import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  // bind it to the property of the element where it sits on
  @HostBinding('class.open') isOpen = false;

  constructor() { }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
