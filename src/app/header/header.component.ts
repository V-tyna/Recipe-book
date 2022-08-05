import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})

export class HeaderComponent {
  @Output() public navigationLink = new EventEmitter<string>();

  public onSelect(type: string) {
    this.navigationLink.emit(type);
  }
}
