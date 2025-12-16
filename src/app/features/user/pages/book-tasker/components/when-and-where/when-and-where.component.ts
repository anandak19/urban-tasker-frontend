import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonComponent } from '@shared/components/button/button.component';
//material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import {
  MatTimepicker,
  MatTimepickerInput,
} from '@angular/material/timepicker';
import { DropdownFieldComponent } from '@shared/components/dropdown-field/dropdown-field.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { cities } from '@shared/constants/constants/city.constant';
import { IDropdownOption } from '@shared/models/form-inputs.model';
import { IBookTaskerTimePlace } from '@features/user/models/book-tasker/book-tasker.model';
import { getTime } from '@shared/helpers/convert-time.utility';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { Dialog } from '@angular/cdk/dialog';
import { LocationModalComponent } from './components/location-modal/location-modal.component';

@Component({
  selector: 'app-when-and-where',
  imports: [
    PageTitleComponent,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormFieldWrapperComponent,
    MatTimepicker,
    MatTimepickerInput,
    DropdownFieldComponent,
    DropdownComponent,
    TextAreaFieldComponent,
    ReactiveFormsModule,
    ButtonLoadingComponent,
  ],
  templateUrl: './when-and-where.component.html',
  styleUrl: './when-and-where.component.scss',
})
export class WhenAndWhereComponent implements OnInit {
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

  whenWhereForm!: FormGroup;
  cities = signal<IDropdownOption[]>(cities);

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);

  onNext() {
    this.next.emit();
  }

  onPrev() {
    this.prev.emit();
  }

  onLocationChoose() {
    this.dialog.open(LocationModalComponent);
    // this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return;
    }

    console.log('fetching location');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      },
      (error) => {
        console.error('Location error:', error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );
  }

  initForm() {
    this.whenWhereForm = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: [''],
      location: this.fb.group({
        latitude: [''],
        longitude: [''],
      }),
    });
  }

  submitTimeDate(payload: IBookTaskerTimePlace) {
    console.log(payload); //logic to submit form
  }

  onSubmit(): void {
    console.log(this.whenWhereForm.value);

    if (this.whenWhereForm.invalid) {
      this.whenWhereForm.markAllAsTouched();
      return;
    }

    const formValue = this.whenWhereForm.value;

    const dateValue = new Date(formValue.date);

    const time = getTime(formValue.time);

    const timePlaceData: IBookTaskerTimePlace = {
      date: dateValue,
      time: time,
      city: formValue.city.id,
      address: formValue.address,
    };

    this.submitTimeDate(timePlaceData);
  }

  ngOnInit(): void {
    this.initForm();
  }
}
