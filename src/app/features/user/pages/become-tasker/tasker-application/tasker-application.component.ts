import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { LabelDescriptionComponent } from '@shared/components/label-description/label-description.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { DropdownFieldComponent } from '@shared/components/dropdown-field/dropdown-field.component';
import { ChipsBoxComponent } from '@shared/components/chips-box/chips-box.component';
import { IDropdownOption } from '@shared/models/form-inputs.model';
import { CategoryService } from '@core/services/category/category.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ImageUploadFieldComponent } from '@shared/components/image-upload-field/image-upload-field.component';
import { noWhitespaceValidator } from '@shared/validators/custom-auth-validators';
import { TaskerApplicationsService } from '@features/user/services/tasker-applications/tasker-applications.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ICreateTaskerApplication } from '@features/user/models/tasker-applications/tasker-applications.model';
import { cities } from '@shared/constants/constants/city.constant';
import { idCards } from '@shared/constants/constants/id-options.constant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasker-application',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonLoadingComponent,
    LabelDescriptionComponent,
    DropdownComponent,
    DropdownFieldComponent,
    ChipsBoxComponent,
    FormFieldWrapperComponent,
    ImageUploadFieldComponent,
    BackButtonComponent,
  ],
  templateUrl: './tasker-application.component.html',
  styleUrl: './tasker-application.component.scss',
})
export class TaskerApplicationComponent implements OnInit {
  readonly MAX_CATEGORIES = 10;
  taskerApplication!: FormGroup;

  private _fb = inject(FormBuilder);
  private _categoryService = inject(CategoryService);
  private _snackbar = inject(SnackbarService);
  private _taskerApplicationService = inject(TaskerApplicationsService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  @ViewChild('imageField') imageField!: ImageUploadFieldComponent;

  // component states
  isLoading = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);

  // form input data's
  idOptions = signal<IDropdownOption[]>(idCards);
  citiesOptions = signal<IDropdownOption[]>(cities);
  categoriesOptions = signal<IDropdownOption[]>([]);
  selectedCategories = signal<IDropdownOption[]>([]);

  //get catgories
  async getCategoryOptions() {
    this._categoryService
      .getAllActiveSubCategories()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.categoriesOptions.set(res);
        },
      });
  }

  // add category
  onCategorySelect(categoryOption: IDropdownOption) {
    const current = this.selectedCategories();
    if (current.some((c) => c.id === categoryOption.id)) return;
    if (current.length >= this.MAX_CATEGORIES) {
      this._snackbar.error(
        `You can only add ${this.MAX_CATEGORIES} categories for now`,
      );
      return;
    }

    this.selectedCategories.update((curr) => [...curr, categoryOption]);

    const fa = this.taskerApplication.get('workCategories') as FormArray;
    fa.push(this._fb.control(categoryOption.id));
  }

  // remove category
  onItemRemove(id: string | number) {
    this.selectedCategories.update((curr) => {
      return curr.filter((c) => c.id !== id);
    });

    const fa = this.taskerApplication.get('workCategories') as FormArray;
    const index = fa.controls.findIndex((ctrl) => ctrl.value === id);

    if (index !== -1) {
      fa.removeAt(index);
    }
  }

  // Init Tasker application
  initTaskerApplication() {
    this.taskerApplication = this._fb.group({
      firstName: [null, [Validators.required, noWhitespaceValidator]],
      lastName: [null, [Validators.required, noWhitespaceValidator]],

      city: [null, [Validators.required]],
      hourlyRate: [null, [Validators.required, noWhitespaceValidator]],

      workCategories: this._fb.array<string>([], {
        validators: Validators.required,
      }),

      idProof: this._fb.group({
        idProofType: [null, [Validators.required]],
        frontImage: [null, [Validators.required]],
        backImage: [null, [Validators.required]],
      }),
    });
  }

  resetForm() {
    this.taskerApplication.reset();
    this.taskerApplication.markAsPristine();
    this.isSubmitted.set(false);
    this.imageField.clearImage();
    this.selectedCategories.set([]);
  }

  submitApplication() {
    this.isSubmitted.set(true);
    if (this.taskerApplication.valid) {
      this.isLoading.set(true);

      const formData = new FormData();
      const values = this.taskerApplication.value as ICreateTaskerApplication;

      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('hourlyRate', values.hourlyRate.toString());
      formData.append('city', values.city.id as string);
      formData.append('workCategories', JSON.stringify(values.workCategories));
      formData.append('idProofType', values.idProof.idProofType.id as string);
      formData.append('frontImage', values.idProof.frontImage);
      formData.append('backImage', values.idProof.backImage);

      // call the method here with formData
      this._taskerApplicationService
        .createTaskerApplication(formData)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.isLoading.set(false)),
        )
        .subscribe({
          next: (res) => {
            this.resetForm();
            this._router.navigate(['tasker/application']);
            this._snackbar.success(res.message);
          },
          error: (err: IApiResponseError) => {
            this._snackbar.error(err.message);
          },
        });
    } else {
      this.taskerApplication.markAllAsTouched();
    }
  }

  get hasCategoryError() {
    return this.isSubmitted() && this.selectedCategories().length <= 0;
  }

  get categoryError() {
    if (this.selectedCategories().length <= 0) {
      return `Add at least one category`;
    } else if (this.selectedCategories().length > this.MAX_CATEGORIES) {
      return `Work categories should be less than ${this.MAX_CATEGORIES + 1}`;
    } else {
      return 'Invalid input';
    }
  }

  ngOnInit(): void {
    this.initTaskerApplication();
    this.getCategoryOptions();
    window.scrollTo(0, 0);
  }
}
