import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { DayColumnComponent } from './components/day-column/day-column.component';
import { Dialog } from '@angular/cdk/dialog';
import { AvailabiltySlotModalComponent } from './components/availabilty-slot-modal/availabilty-slot-modal.component';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';
import { AvailabilityService } from '@features/tasker/services/availability/availability.service';
import {
  IMappedAvailability,
  ISlot,
  ISlotModalBase,
  ISlotModalData,
} from '@features/tasker/modals/availability.modal';
import { WeekDayKeys } from '@features/tasker/constants/week-days.constant';

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
export class TaskerAvailbilityComponent implements OnInit {
  private _dialog = inject(Dialog);
  private _confirmDialog = inject(ConfirmDialogService);
  private _availabilityService = inject(AvailabilityService);

  weekDays: WeekDayKeys[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  availability!: IMappedAvailability;

  getOneAvailability(day: WeekDayKeys) {
    return this.availability?.[day] || null;
  }

  addSlot(day: WeekDayKeys) {
    const dialogRef = this._dialog.open<
      AvailabiltySlotModalComponent,
      ISlotModalBase
    >(AvailabiltySlotModalComponent, {
      disableClose: true,
      data: { day },
    });

    dialogRef.closed.subscribe((isRefresh) => {
      if (!isRefresh) return;

      this.getAvailabilities();
    });
  }

  onEditSlot(day: WeekDayKeys, availabilityId: string, slot: ISlot) {
    this._dialog.open<AvailabiltySlotModalComponent, ISlotModalData>(
      AvailabiltySlotModalComponent,
      {
        disableClose: true,
        data: { day, availabilityId, slot },
      },
    );
  }

  async addDefault() {
    const yes = await this._confirmDialog.ask(
      `Are you sure to add default time slots for all days`,
    );
    console.log(yes);
    this._availabilityService.createDefault().subscribe({
      next: (res) => {
        console.log(res);
        this.getAvailabilities();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async removeSlot(availabilityId: string, slot: ISlot) {
    const yes = await this._confirmDialog.ask(
      'Are you sure to delete remove this slot ?',
    );

    if (yes) {
      this._availabilityService.deleteSlot(availabilityId, slot).subscribe({
        next: (res) => {
          console.log(res);
          this.getAvailabilities();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  getAvailabilities() {
    this._availabilityService.findTaskerAvailabilities().subscribe({
      next: (res) => {
        this.availability = res.data;
        console.log(this.availability);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.getAvailabilities();
  }
}
