import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() disabled: boolean = false
  @Input() type: 'primary'| 'secondary' = 'primary'

  @Output() clickEvent = new EventEmitter()
  onBtnClick(){
    this.clickEvent.emit()
  }
}