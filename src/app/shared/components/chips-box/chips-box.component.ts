import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IOptionData } from '@shared/models/form-inputs.model';

@Component({
  selector: 'app-chips-box',
  imports: [MatChipsModule, MatIconModule, CommonModule],
  templateUrl: './chips-box.component.html',
  styleUrl: './chips-box.component.scss',
})
export class ChipsBoxComponent {
  @Input() items = signal<IOptionData[]>([]);
  @Input() editable = true;
  @Output() removeItem = new EventEmitter<string>();

  remove(id: string) {
    if (this.editable) {
      this.removeItem.emit(id);
    }
  }
}
