import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-day-column',
  imports: [CommonModule, MatIcon],
  templateUrl: './day-column.component.html',
  styleUrl: './day-column.component.scss',
})
export class DayColumnComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() day: any;
  @Input() dayIndex!: number;

  @Output() addSlot = new EventEmitter<number>();
  @Output() removeSlot = new EventEmitter<{
    dayIndex: number;
    slotIndex: number;
  }>();

  onAddSlot() {
    this.addSlot.emit(this.dayIndex);
  }

  onRemoveSlot(slotIndex: number) {
    this.removeSlot.emit({ dayIndex: this.dayIndex, slotIndex });
  }
}
