import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { IOptionData } from '@shared/models/form-inputs.model';
import { SubCategoryService } from '@core/services/category/sub-category.service';
import { CategoryService } from '@core/services/category/category.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskerProfileService } from '@features/tasker/services/tasker-profile/tasker-profile.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-work-category',
  imports: [
    FormFieldWrapperComponent,
    DropdownComponent,
    ButtonLoadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-work-category.component.html',
  styleUrl: './add-work-category.component.scss',
})
export class AddWorkCategoryComponent implements OnInit {
  categoryOptions = signal<IOptionData[]>([]);
  subCategoryOptions = signal<IOptionData[]>([]);

  categoryForm!: FormGroup;

  private _destroyRef = inject(DestroyRef);
  private _dialogRef = inject(DialogRef);
  private _categoryService = inject(CategoryService);
  private _subCategoryService = inject(SubCategoryService);
  private _fb = inject(FormBuilder);
  private _taskerProfileService = inject(TaskerProfileService);
  private _snackbar = inject(SnackbarService);

  // 1. To get the parent categories
  getCategoryOptions() {
    this._categoryService
      .getCategoryOptions()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.categoryOptions.set(res.data);
          this.categoryForm.reset();
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  onCategorySelect(categoryOption: IOptionData) {
    this._subCategoryService
      .getActiveSubcategoriesOptions(categoryOption.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subCategoryOptions.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  initForm() {
    this.categoryForm = this._fb.group({
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;

    const categoryId = this.categoryForm.get('category')?.value.id;
    this.addCategory(categoryId);
  }

  addCategory(categoryId: string) {
    console.log(categoryId);
    this._taskerProfileService
      .addTaskerWorkCateories(categoryId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this.categoryForm.reset();
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getCategoryOptions();
    this.initForm();
  }
}
