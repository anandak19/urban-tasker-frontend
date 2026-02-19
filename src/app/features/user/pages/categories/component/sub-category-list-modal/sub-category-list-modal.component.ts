import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubCategoryService } from '@core/services/category/sub-category.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ISubCategoryCard } from '@shared/models/categories/subcategories.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import { ParentCategoryCardComponent } from '../parent-category-card/parent-category-card.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sub-category-list-modal',
  imports: [ParentCategoryCardComponent, MatIconButton, MatIcon],
  templateUrl: './sub-category-list-modal.component.html',
  styleUrl: './sub-category-list-modal.component.scss',
})
export class SubCategoryListModalComponent implements OnInit {
  subCategories = signal<ISubCategoryCard[]>([]);

  data = inject<IOptionData>(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef);
  private _subCategoryService = inject(SubCategoryService);
  private _snackbarService = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  onSubCategorySelect(subcategory: IOptionData) {
    this._dialogRef.close(subcategory);
  }

  closeModal() {
    this._dialogRef.close();
  }

  ngOnInit(): void {
    this._subCategoryService
      .getActiveSubCategories(this.data.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.subCategories.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }
}
