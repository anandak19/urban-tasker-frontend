import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { DayColumnComponent } from './components/day-column/day-column.component';
import { Dialog } from '@angular/cdk/dialog';
import { AvailabiltySlotModalComponent } from './components/availabilty-slot-modal/availabilty-slot-modal.component';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';
import { AvailabilityService } from '@features/tasker/services/availability/availability.service';
import {
  IMappedAvailability,
  ISlotDoc,
  ISlotModalBase,
  ISlotModalData,
} from '@features/tasker/modals/availability.modal';
import { WeekDayKeys } from '@features/tasker/constants/week-days.constant';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private _snackbar = inject(SnackbarService);

  weekDays: WeekDayKeys[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  availability = signal<IMappedAvailability>({} as IMappedAvailability);
  hasAnySlots = computed(() => Object.keys(this.availability()).length);

  getOneAvailability(day: WeekDayKeys) {
    return this.availability()?.[day] || null;
  }

  addSlot(day: WeekDayKeys) {
    const dialogRef = this._dialog.open<
      AvailabiltySlotModalComponent,
      ISlotModalBase
    >(AvailabiltySlotModalComponent, {
      disableClose: true,
      data: { day },
    });

    dialogRef.closed.pipe(takeUntilDestroyed()).subscribe((isRefresh) => {
      if (!isRefresh) return;

      this.getAvailabilities();
    });
  }

  // FIX THIS GO
  onEditSlot(day: WeekDayKeys, slot: ISlotDoc) {
    const dialogRef = this._dialog.open<
      AvailabiltySlotModalComponent,
      ISlotModalData
    >(AvailabiltySlotModalComponent, {
      disableClose: true,
      data: { day, slot },
    });

    dialogRef.closed.pipe(takeUntilDestroyed()).subscribe((isRefresh) => {
      if (!isRefresh) return;
      this.getAvailabilities();
    });
  }

  async addDefault() {
    const yes = await this._confirmDialog.ask(
      `Are you sure to add default time slots for all days`,
    );
    if (yes) {
      this._availabilityService
        .createDefault()
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: (res) => {
            console.log(res);
            this.getAvailabilities();
          },
          error: (err: IApiResponseError) => {
            console.log(err);
            this._snackbar.error(err.message);
          },
        });
    }
  }

  async onDeleteAllClick() {
    const yes = await this._confirmDialog.ask(
      'Are you sure to delete all time slots',
    );

    if (yes) {
      this._availabilityService
        .deleteAllSlots()
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: (res) => {
            console.log(res);
            this._snackbar.success(res.message);
            this.getAvailabilities();
          },
          error: (err: IApiResponseError) => {
            this._snackbar.error(err.message);
          },
        });
    }
  }

  getAvailabilities() {
    this._availabilityService
      .findTaskerAvailabilities()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => {
          this.availability.set(res.data);
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
