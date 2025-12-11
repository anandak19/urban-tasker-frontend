import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';

// materails
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  getTime,
  isInvalid,
  toDate,
} from '@shared/helpers/convert-time.utility';
import {
  ISlot,
  ISlotModalData,
} from '@features/tasker/modals/availability.modal';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AvailabilityService } from '@features/tasker/services/availability/availability.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { WeekDayKeys } from '@features/tasker/constants/week-days.constant';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';

@Component({
  selector: 'app-availabilty-slot-modal',
  imports: [
    MatIcon,
    FormFieldWrapperComponent,
    ButtonLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './availabilty-slot-modal.component.html',
  styleUrl: './availabilty-slot-modal.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabiltySlotModalComponent implements OnInit {
  slotForm!: FormGroup;
  isEditModal = signal<boolean>(false);

  private _dialogRef = inject(DialogRef);
  private _slotData = inject<ISlotModalData>(DIALOG_DATA);
  private _fb = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private _availabilityService = inject(AvailabilityService);
  private _confirmDialog = inject(ConfirmDialogService);

  onClose(refresh = false) {
    this._dialogRef.close(refresh);
  }

  async onChangeDisableClick() {
    const updatedIsDisabled = !this._slotData.slot.isDisabled;
    if (updatedIsDisabled) {
      const yes = await this._confirmDialog.ask('Disable this slot');

      if (yes) {
        this.changeIsDisabled(updatedIsDisabled);
      }
    } else {
      this.changeIsDisabled(updatedIsDisabled);
    }
  }

  changeIsDisabled(updatedIsDisabled: boolean) {
    this._availabilityService
      .changeStatus(
        this._slotData.availabilityId,
        this._slotData.slot.id,
        updatedIsDisabled,
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.onClose(true);
          this._snackbar.success('Updated status');
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbar.error(err.message);
        },
      });
  }

  createSlot(day: WeekDayKeys, newSlot: ISlot) {
    this._availabilityService.createSlot(day, newSlot).subscribe({
      next: (res) => {
        console.log(res);
        this.onClose(true);
        this._snackbar.success('Slot added successfully');
      },
      error: (err: IApiResponseError) => {
        console.log(err);
        this._snackbar.error(err.message);
      },
    });
  }

  updateSlot(updatedSlot: ISlot) {
    this._availabilityService
      .updateSlot(
        this._slotData.availabilityId,
        this._slotData.slot.id,
        updatedSlot,
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.onClose(true);
          this._snackbar.success('Slot updated successfully');
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbar.error(err.message);
        },
      });
  }

  onFormSubmit() {
    if (this.slotForm.invalid) return;

    const startTime = this.slotForm.get('start')?.value as Date;
    const start = getTime(startTime);

    const endTime = this.slotForm.get('end')?.value as Date;
    const end = getTime(endTime);

    const invalidTime = isInvalid(end, start);

    if (invalidTime) {
      this._snackbar.error('End time should be greater than start');
      return;
    }

    const slotData: ISlot = {
      start,
      end,
    };

    if (this.isEditModal()) {
      // if Update
      this.updateSlot(slotData);
    } else {
      // if create
      this.createSlot(this._slotData.day, slotData);
    }
  }

  initForm() {
    this.slotForm = this._fb.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
  }

  patchForm(slot: ISlot) {
    this.slotForm.patchValue({
      start: toDate(slot.start),
      end: toDate(slot.end),
    });
  }

  async onDeleteClick() {
    const yes = await this._confirmDialog.ask(
      'Are you sure to delete remove this slot ?',
    );

    if (yes) {
      this.deleteSlot(this._slotData.availabilityId, this._slotData.slot.id);
    }
  }

  async deleteSlot(availabilityId: string, slotId: string) {
    this._availabilityService.deleteSlot(availabilityId, slotId).subscribe({
      next: (res) => {
        console.log(res);
        this.onClose(true);
        this._snackbar.success('Succssfully Deleted');
      },
      error: (err: IApiResponseError) => {
        this._snackbar.success(err.message);
      },
    });
  }

  get disableText() {
    return this._slotData.slot.isDisabled ? 'Enable Slot' : 'Disable Slot';
  }

  get isDisabled() {
    return this.isEditModal() ? this._slotData.slot.isDisabled : false;
  }

  ngOnInit(): void {
    console.log(this._slotData);
    this.initForm();
    if (this._slotData.slot) {
      this.isEditModal.set(true);
      this.patchForm(this._slotData.slot);
    }
  }
}
