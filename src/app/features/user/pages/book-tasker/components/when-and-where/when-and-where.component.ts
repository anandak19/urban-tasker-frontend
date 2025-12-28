import {
  Component,
  DestroyRef,
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
  AbstractControlOptions,
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
import { ILocationLatLng } from '@features/user/models/book-tasker/location.model';
import { locationRequiredValidator } from '@shared/validators/location-validators';
import { noWhitespaceValidator } from '@shared/validators/custom-auth-validators';
import { BookTaskerService } from '@features/user/services/book-tasker/book-tasker/book-tasker.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  isSubmitted = signal<boolean>(false);

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private _bookTaskerService = inject(BookTaskerService);
  private _destroyRef = inject(DestroyRef);

  private _location: ILocationLatLng | null = null;

  onNext() {
    this.next.emit();
    this._bookTaskerService.getAvailbleTaskers();
  }

  onPrev() {
    this.prev.emit();
  }

  populateLocationData(coords: ILocationLatLng) {
    this.whenWhereForm.get('location')?.patchValue({
      latitude: coords.lat,
      longitude: coords.lng,
    });

    this._location = coords;
  }

  onLocationChoose() {
    const locationModal = this.dialog.open(LocationModalComponent, {
      data: this._location,
    });

    locationModal.closed
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((location) => {
        if (location) {
          const cordinates = location as ILocationLatLng;
          this.populateLocationData(cordinates);
          console.log(`Loca: ${cordinates.lat} : ${cordinates.lng}`);
        }
      });
  }

  initForm() {
    this.whenWhereForm = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required, noWhitespaceValidator]],
      location: this.fb.group(
        {
          latitude: [''],
          longitude: [''],
        },
        { validators: [locationRequiredValidator] } as AbstractControlOptions,
      ),
    });
  }

  submitTimeDate(payload: IBookTaskerTimePlace) {
    console.log('called save time');

    this._bookTaskerService.saveWhenWhere(payload);
    this.onNext();
  }

  onSubmit(): void {
    console.log(this.whenWhereForm.value);
    this.isSubmitted.set(true);

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
      location: {
        latitude: formValue.location.latitude,
        longitude: formValue.location.longitude,
      },
    };

    this.submitTimeDate(timePlaceData);
  }

  get locationControl() {
    return this.whenWhereForm.get('location');
  }

  get locationChoosen() {
    return this.locationControl?.valid;
  }

  get locationError() {
    return this.locationControl?.invalid && this.isSubmitted()
      ? 'Location is requred'
      : '';
  }

  get dateError() {
    return this.whenWhereForm.get('date')?.invalid && this.isSubmitted()
      ? 'Date is required'
      : '';
  }

  get timeError() {
    return this.whenWhereForm.get('time')?.invalid && this.isSubmitted()
      ? 'Time is required'
      : '';
  }

  get cityError() {
    return this.whenWhereForm.get('city')?.invalid && this.isSubmitted()
      ? 'City is required'
      : '';
  }

  ngOnInit(): void {
    this.initForm();
  }
}
