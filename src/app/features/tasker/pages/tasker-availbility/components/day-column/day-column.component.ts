import { CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeekDayKeys } from '@features/tasker/constants/week-days.constant';
import {
  IAvailabilityMap,
  IAvailabilitySlotData,
} from '@features/tasker/modals/availability.modal';
import { toDate } from '@shared/helpers/convert-time.utility';

@Component({
  selector: 'app-day-column',
  imports: [CommonModule, TitleCasePipe, UpperCasePipe],
  templateUrl: './day-column.component.html',
  styleUrl: './day-column.component.scss',
})
export class DayColumnComponent {
  @Input() availabilityData!: IAvailabilityMap | null;
  @Input() day!: WeekDayKeys;

  @Output() addSlot = new EventEmitter<WeekDayKeys>();
  @Output() editSlot = new EventEmitter<{
    day: WeekDayKeys;
    slot: IAvailabilitySlotData;
  }>();

  protected MAX_SLOT = 3;

  onAddSlot(day: WeekDayKeys) {
    this.addSlot.emit(day);
  }

  onEditSlot(day: WeekDayKeys, slot: IAvailabilitySlotData) {
    this.editSlot.emit({ day, slot });
  }

  to12hr(time: string) {
    const date = toDate(time);
    return date?.toLocaleTimeString('es-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  get isMaxSlot() {
    if (this.availabilityData?.slots) {
      return this.availabilityData?.slots.length >= this.MAX_SLOT
        ? true
        : false;
    }
    return false;
  }
}
