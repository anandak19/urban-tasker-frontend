import { Component, inject, Input } from '@angular/core';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IBookingDetails } from '@shared/models/booking.model';
import { LocationModalComponent } from '@features/user/pages/book-tasker/components/choose-tasker/components/location-modal/location-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-task-info-box',
  imports: [FormFieldWrapperComponent, ButtonComponent],
  templateUrl: './task-info-box.component.html',
  styleUrl: './task-info-box.component.scss',
})
export class TaskInfoBoxComponent {
  @Input() taskInfo!: IBookingDetails | null;
  private _dialog = inject(Dialog);

  onViewLocation() {
    this._dialog.open(LocationModalComponent, {
      data: {
        lat: this.taskInfo?.location.latitude,
        lng: this.taskInfo?.location.longitude,
        isReadOnly: true,
      },
    });
  }
}
