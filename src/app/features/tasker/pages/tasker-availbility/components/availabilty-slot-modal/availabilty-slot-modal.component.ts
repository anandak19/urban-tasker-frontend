import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
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

  private _dialogRef = inject(DialogRef);
  private _slotData = inject<ISlotModalData>(DIALOG_DATA);
  private _fb = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private _availabilityService = inject(AvailabilityService);

  onClose(refresh = false) {
    this._dialogRef.close(refresh);
  }

  onFormSubmit() {
    if (this.slotForm.invalid) return;

    console.log(this.slotForm.value);
    const startTime = this.slotForm.get('start')?.value as Date;
    const start = getTime(startTime);

    const endTime = this.slotForm.get('end')?.value as Date;
    const end = getTime(endTime);

    const invalidTime = isInvalid(end, start);

    if (invalidTime) {
      this._snackbar.error('End time should be greater than start');
      return;
    }

    const newSlot: ISlot = {
      start,
      end,
    };

    this._availabilityService
      .createSlot(this._slotData.day, newSlot)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.onClose(true);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbar.error(err.message);
        },
      });
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

  ngOnInit(): void {
    console.log(this._slotData);
    this.initForm();
    if (this._slotData.slot) {
      this.patchForm(this._slotData.slot);
    }
  }
}
