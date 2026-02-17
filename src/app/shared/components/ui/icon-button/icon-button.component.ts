import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-icon-button',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Input() iconName!: string;
  @Output() isClicked = new EventEmitter();

  onClick() {
    this.isClicked.emit();
  }
}
