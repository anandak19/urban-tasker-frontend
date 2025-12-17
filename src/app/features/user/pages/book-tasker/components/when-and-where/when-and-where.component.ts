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
import { ILocationLatLng } from '@features/user/models/book-tasker/location.model';

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

  private _location: ILocationLatLng | null = null;

  onNext() {
    this.next.emit();
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

    locationModal.closed.subscribe((location) => {
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
      address: [''],
      location: this.fb.group({
        latitude: ['', [Validators.required]],
        longitude: ['', [Validators.required]],
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

  get locationChoosen() {
    return (
      (this.whenWhereForm.get('location')?.get('latitude')?.valid &&
        this.whenWhereForm.get('location')?.get('longitude')?.valid) ||
      false
    );
  }

  ngOnInit(): void {
    this.initForm();
  }
}
