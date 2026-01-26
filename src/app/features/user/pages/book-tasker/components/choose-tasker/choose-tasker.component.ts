import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
// import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { TaskerListingCardComponent } from './components/tasker-listing-card/tasker-listing-card.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  IBookTaskerTasker,
  IBookTaskerTimePlace,
} from '@features/user/models/book-tasker/book-tasker.model';
import { BookTaskerService } from '@features/user/services/book-tasker/book-tasker/book-tasker.service';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DropdownFieldComponent } from '@shared/components/dropdown-field/dropdown-field.component';
import { cities } from '@shared/constants/constants/city.constant';
import { IOptionData } from '@shared/models/form-inputs.model';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import {
  MatFormField,
  MatError,
  MatInputModule,
} from '@angular/material/input';
import {
  MatDatepickerInput,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatTimepicker,
  MatTimepickerInput,
} from '@angular/material/timepicker';
import { Dialog } from '@angular/cdk/dialog';
import { LocationModalComponent } from './components/location-modal/location-modal.component';
import { ILocationLatLng } from '@features/user/models/book-tasker/location.model';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { locationRequiredValidator } from '@shared/validators/location-validators';
import {
  getTime,
  toDateStringFormat,
} from '@shared/helpers/convert-time.utility';

@Component({
  selector: 'app-choose-tasker',
  imports: [
    ReactiveFormsModule,
    PageTitleComponent,
    TaskerListingCardComponent,
    ButtonComponent,
    PaginationComponent,
    DropdownFieldComponent,
    DropdownComponent,
    FormFieldWrapperComponent,
    ButtonLoadingComponent,
    MatFormField,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatError,
    MatTimepickerInput,
    MatTimepicker,
  ],
  templateUrl: './choose-tasker.component.html',
  styleUrl: './choose-tasker.component.scss',
})
export class ChooseTaskerComponent implements OnInit {
  private _bookTaskerService = inject(BookTaskerService);
  private _snackbarService = inject(SnackbarService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private dialog = inject(Dialog);
  private fb = inject(FormBuilder);

  private _location: ILocationLatLng | null = null;
  cities = signal<IOptionData[]>(cities);
  chooseTaskerForm!: FormGroup;
  isSubmitted = signal<boolean>(false);

  @Output() prev = new EventEmitter();
  // sample addded
  availableTaskers = this._bookTaskerService.availTaskers;
  // sample added
  paginationData = this._bookTaskerService.paginationData;

  filter = this._bookTaskerService.filter;

  onTaskerPageChange(page: number) {
    this.filter.update((current) => ({
      ...current,
      page,
    }));
    // call the get Taskers method here from book service with pagination data here
    this._bookTaskerService.getAvailbleTaskers();
  }

  onPrev() {
    this.prev.emit();
  }

  // on choosing a tasker
  chooseTasker(taskerId: string) {
    const taskerData: IBookTaskerTasker = {
      taskerId,
    };
    this._bookTaskerService.saveTaskerData(taskerData);
    this.completeBooking();
    // call api to book tasker with the amount// open razorpay
  }

  populateLocationData(coords: ILocationLatLng) {
    this.chooseTaskerForm.get('location')?.patchValue({
      latitude: coords.lat,
      longitude: coords.lng,
    });

    this._location = coords;
  }

  initForm() {
    this.chooseTaskerForm = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      city: ['', [Validators.required]],
      location: this.fb.group(
        {
          latitude: [''],
          longitude: [''],
        },
        { validators: [locationRequiredValidator] } as AbstractControlOptions,
      ),
    });
  }

  //keep
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

    // call the get taskers
  }

  // book tasker method
  completeBooking() {
    this._bookTaskerService
      .bookTasker()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbarService.success(res.message);
          this._bookTaskerService.resetBookingState();
          this._router.navigate(['/tasks']);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbarService.error(err.message);
        },
      });
  }

  submitChooseTaskersData(payload: IBookTaskerTimePlace) {
    console.log('Query', payload);
    this._bookTaskerService.saveWhenWhere(payload);
    this._bookTaskerService.getAvailbleTaskers();
  }

  onchooseTaskerFormSubmit() {
    console.log(this.chooseTaskerForm.value);
    this.isSubmitted.set(true);

    if (this.chooseTaskerForm.invalid) {
      this.chooseTaskerForm.markAllAsTouched();
      return;
    }

    const formValue = this.chooseTaskerForm.value;

    // const dateValue = new Date(formValue.date).toISOString();
    const formDate = toDateStringFormat(formValue.date);

    const time = getTime(formValue.time);

    const timePlaceData: IBookTaskerTimePlace = {
      date: formDate,
      time: time,
      city: formValue.city.id,
      location: {
        latitude: formValue.location.latitude,
        longitude: formValue.location.longitude,
      },
    };

    console.log('Cleanded payload', timePlaceData);

    this.submitChooseTaskersData(timePlaceData);
  }

  //getters
  get cityError() {
    return this.isSubmitted() && this.chooseTaskerForm.get('city')?.invalid
      ? 'Select a city'
      : '';
  }

  get locationChoosen() {
    return this.chooseTaskerForm?.get('location')?.valid;
  }

  get locationError() {
    return this.isSubmitted() && !this.locationChoosen
      ? 'Location is requred'
      : '';
  }

  get dateError() {
    return this.chooseTaskerForm.get('date')?.invalid && this.isSubmitted()
      ? 'Date is required'
      : '';
  }

  get timeError() {
    return this.chooseTaskerForm.get('time')?.invalid && this.isSubmitted()
      ? 'Time is required'
      : '';
  }

  // LIFE CYCLES
  ngOnInit(): void {
    this.initForm();
    console.log(this.availableTaskers());
  }
}
