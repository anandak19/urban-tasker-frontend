import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { cities } from '@shared/constants/constants/city.constant';
import { IOptionData } from '@shared/models/form-inputs.model';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { UserService } from '@features/user/services/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IHomeAddress,
  IUserData,
} from '@features/admin/models/user-data.interface';
import { IApiResponseError } from '@shared/models/api-response.model';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { locationRequiredValidator } from '@shared/validators/location-validators';
import { IHomeAddressPayload } from '@features/user/models/profile/profile-details.model';
import { Dialog } from '@angular/cdk/dialog';
import { LocationModalComponent } from '@features/user/pages/book-tasker/components/when-and-where/components/location-modal/location-modal.component';
import { ILocationLatLng } from '@features/user/models/book-tasker/location.model';
import { UserProfileService } from '@features/user/services/user/user-profile/user-profile.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-location-form',
  imports: [
    BackButtonComponent,
    ButtonComponent,
    ButtonLoadingComponent,
    TextAreaFieldComponent,
    FormFieldWrapperComponent,
    DropdownComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-location-form.component.html',
  styleUrl: './user-location-form.component.scss',
})
export class UserLocationFormComponent implements OnInit {
  cities = signal<IOptionData[]>(cities);
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  userData = signal<IUserData | null>(null);

  private _userService = inject(UserService);
  private _userProfileService = inject(UserProfileService);
  private _destroyRef = inject(DestroyRef);
  private _fb = inject(FormBuilder);
  private _dialog = inject(Dialog);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);

  locationForm!: FormGroup;
  private _location: ILocationLatLng | null = null;

  getUserData() {
    this._userService
      .getUserData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.userData.set(res.data);
          if (res.data.homeAddress) {
            this.patchForm(res.data.homeAddress);
          }
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  initForm() {
    this.locationForm = this._fb.group({
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      location: this._fb.group(
        {
          latitude: [''],
          longitude: [''],
        },
        { validators: [locationRequiredValidator] } as AbstractControlOptions,
      ),
    });
  }

  patchForm(homeAddress: IHomeAddress): void {
    if (!homeAddress) return;

    const latitude = homeAddress.location?.coordinates?.[1] || null;
    const longitude = homeAddress.location?.coordinates?.[0] || null;

    this.locationForm.patchValue({
      city: homeAddress.city ? this.mapCity(homeAddress.city) : '',
      address: homeAddress.address ?? '',
      location: {
        latitude: latitude ?? '',
        longitude: longitude ?? '',
      },
    });

    if (latitude && longitude) {
      this._location = {
        lat: homeAddress.location?.coordinates?.[1],
        lng: homeAddress.location?.coordinates?.[0],
      };
    }
  }

  resetForm() {
    this.locationForm.reset();
    this.locationForm.markAsUntouched();
  }

  private mapCity(cityId: string) {
    return cities.find((c) => c.id === cityId) ?? '';
  }

  onSubmit(): void {
    this.isSubmitted.set(true);

    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      return;
    }

    const formValue = this.locationForm.getRawValue();

    const payload: IHomeAddressPayload = {
      city: formValue.city?.id,
      address: formValue.address,
      latitude: Number(formValue.location.latitude),
      longitude: Number(formValue.location.longitude),
    };

    this.updateHomeLocation(payload);
  }

  updateHomeLocation(payload: IHomeAddressPayload) {
    console.log(payload);
    this.isLoading.set(true);
    this._userProfileService
      .updateHomeAddress(payload)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this.resetForm();
          this._router.navigate(['/profile']);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  populateLocationData(coords: ILocationLatLng) {
    this.locationForm.get('location')?.patchValue({
      latitude: coords.lat,
      longitude: coords.lng,
    });

    this._location = coords;
  }

  openLocationModal() {
    const locationModal = this._dialog.open(LocationModalComponent, {
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

  get locationControl() {
    return this.locationForm.get('location');
  }

  get locationChoosen() {
    return this.locationControl?.valid;
  }

  get locationError() {
    return this.locationControl?.invalid && this.isSubmitted()
      ? 'Location is requred'
      : '';
  }

  get cityError() {
    return this.isSubmitted() && this.locationForm.get('city')?.invalid
      ? 'City is required'
      : '';
  }

  ngOnInit(): void {
    this.initForm();
    this.getUserData();
  }
}
