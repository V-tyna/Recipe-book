import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() public message: string;
  @Output() public closeModal = new EventEmitter<void>();

  public onClose(): void {
    this.closeModal.emit();
  }
}
