import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';

// materails
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-availabilty-slot-modal',
  imports: [
    MatIcon,
    FormFieldWrapperComponent,
    ButtonLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
  ],
  templateUrl: './availabilty-slot-modal.component.html',
  styleUrl: './availabilty-slot-modal.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabiltySlotModalComponent {
  private _dialogRef = inject(DialogRef);

  onClose() {
    this._dialogRef.close();
  }
}
