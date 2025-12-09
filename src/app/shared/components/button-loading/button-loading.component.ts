import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-button-loading',
  imports: [ButtonComponent, MatProgressSpinner],
  templateUrl: './button-loading.component.html',
  styleUrl: './button-loading.component.scss',
})
export class ButtonLoadingComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() isLoading = signal(false); // *
  @Input() text!: string; // *

  @Output() isClicked = new EventEmitter(); // *

  buttonClicked() {
    this.isClicked.emit();
  }
}
