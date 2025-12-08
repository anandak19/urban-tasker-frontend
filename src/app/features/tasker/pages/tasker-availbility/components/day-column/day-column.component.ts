import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { WeekDayKeys } from '@features/tasker/constants/week-days.constant';
import {
  IAvailability,
  ISlotDoc,
  ISlotModalData,
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
  @Output() removeSlot = new EventEmitter<{
    availabilityId: string;
    slotId: string;
  }>();
  @Output() editSlot = new EventEmitter<ISlotModalData>();

  onAddSlot(day: WeekDayKeys) {
    this.addSlot.emit(day);
  }

  onEditSlot(day: WeekDayKeys, availabilityId: string, slot: ISlotDoc) {
    this.editSlot.emit({ day, availabilityId, slot });
  }

  onRemoveSlot(availabilityId: string, slotId: string) {
    this.removeSlot.emit({ availabilityId, slotId });
  }

  get isMaxSlot() {
    return this.availabilityData && this.availabilityData.slots.length >= 3
      ? true
      : false;
  }
}
