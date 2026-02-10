import {
  Component,
  DestroyRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { CategoryManagementService } from '@features/admin/services/category-management/category-management.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-category',
  imports: [
    CategoryFormComponent,
    AdminPageTitleComponent,
    BackButtonComponent,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  private _categoryService = inject(CategoryManagementService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  @ViewChild('categoryForm') categoryForm!: CategoryFormComponent;

  isCreating = signal<boolean>(false);

  handleFormData(categoryFormData: FormData) {
    this.isCreating.set(true);
    this._categoryService
      .addCategory(categoryFormData)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isCreating.set(false)),
      )
      .subscribe({
        next: (res) => {
          console.log('Response', res);
          this._snackbar.success('Category created successfully');

          this.categoryForm.resetForm();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message ?? 'Somthing went wrong');
        },
      });
  }
}
