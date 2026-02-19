import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-presentation-modal',
  imports: [MatIcon, MatIconButton],
  templateUrl: './presentation-modal.component.html',
  styleUrl: './presentation-modal.component.scss',
})
export class PresentationModalComponent {
  @Output() closeModal = new EventEmitter();
  @Input() size: 'medium' | 'large' = 'medium';

  close() {
    this.closeModal.emit();
  }
}
