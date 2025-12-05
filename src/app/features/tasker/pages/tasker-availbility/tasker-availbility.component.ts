import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { DayColumnComponent } from './components/day-column/day-column.component';
import { Dialog } from '@angular/cdk/dialog';
import { AvailabiltySlotModalComponent } from './components/availabilty-slot-modal/availabilty-slot-modal.component';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';

interface DayData {
  name: string;
  slots: string[];
}

@Component({
  selector: 'app-tasker-availbility',
  imports: [
    PageTitleComponent,
    CommonModule,
    ButtonLoadingComponent,
    DayColumnComponent,
  ],
  templateUrl: './tasker-availbility.component.html',
  styleUrl: './tasker-availbility.component.scss',
})
export class TaskerAvailbilityComponent {
  private _dialog = inject(Dialog);
  private _confirmDialog = inject(ConfirmDialogService);

  days: DayData[] = [
    { name: 'Sunday', slots: [] },
    { name: 'Monday', slots: [] },
    { name: 'Tuesday', slots: [] },
    { name: 'Wednesday', slots: [] },
    { name: 'Thursday', slots: [] },
    { name: 'Friday', slots: [] },
    { name: 'Saturday', slots: [] },
  ];

  addSlot(dayIndex: number) {
    // if (this.days[dayIndex].slots.length < 3) {
    //   this.days[dayIndex].slots.push(
    //     `Slot ${this.days[dayIndex].slots.length + 1}`,
    //   );
    // }

    this._dialog.open(AvailabiltySlotModalComponent, {
      disableClose: true,
      data: dayIndex,
    });
  }

  async addDefault() {
    const yes = await this._confirmDialog.ask(
      `Are you sure to add default time slots for all days`,
    );
    console.log(yes);
  }

  removeSlot(dayIndex: number, slotIndex: number) {
    this.days[dayIndex].slots.splice(slotIndex, 1);
  }
}
