import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { WeekDayKeys } from '@features/tasker/constants/week-days.constant';
import {
  IAvailability,
  ISlot,
} from '@features/tasker/modals/availability.modal';

@Component({
  selector: 'app-day-column',
  imports: [CommonModule, MatIcon, TitleCasePipe],
  templateUrl: './day-column.component.html',
  styleUrl: './day-column.component.scss',
})
export class DayColumnComponent {
  @Input() availabilityData!: IAvailability | null;
  @Input() day!: WeekDayKeys;

  @Output() addSlot = new EventEmitter<WeekDayKeys>();
  @Output() removeSlot = new EventEmitter<{ day: WeekDayKeys; slot: ISlot }>();

  onAddSlot(day: WeekDayKeys) {
    this.addSlot.emit(day);
  }

  onRemoveSlot(day: WeekDayKeys, slot: ISlot) {
    this.removeSlot.emit({ day, slot });
  }

  get isMaxSlot() {
    return this.availabilityData && this.availabilityData.slots.length > 3
      ? true
      : false;
  }
}
