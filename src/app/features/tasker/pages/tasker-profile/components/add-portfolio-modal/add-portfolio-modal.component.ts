import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { ImageUploadFieldComponent } from '@shared/components/image-upload-field/image-upload-field.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { PortfolioService } from '@features/tasker/services/portfolio/portfolio.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IPortfolioFormVal } from '@shared/models/tasker-profile/tasker-profile.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-portfolio-modal',
  imports: [
    MatIconModule,
    FormFieldWrapperComponent,
    ImageUploadFieldComponent,
    TextAreaFieldComponent,
    ButtonComponent,
    ButtonLoadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-portfolio-modal.component.html',
  styleUrl: './add-portfolio-modal.component.scss',
})
export class AddPortfolioModalComponent implements OnInit {
  private _dialogRef =
    inject<MatDialogRef<AddPortfolioModalComponent, { isRefresh: boolean }>>(
      MatDialogRef,
    );
  private _snackBar = inject(SnackbarService);
  private _portfolioService = inject(PortfolioService);
  private _destroyRef = inject(DestroyRef);
  private _fb = inject(FormBuilder);

  portfolioForm!: FormGroup;
  selectedImage!: File;
  isAddingLoading = signal<boolean>(false);

  @ViewChild('image') image!: ImageUploadFieldComponent;

  onClose(isRefresh = false) {
    this._dialogRef.close({ isRefresh });
  }

  addPortfolio(data: FormData) {
    this.isAddingLoading.set(true);
    this._portfolioService
      .addPortfolioImage(data)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isAddingLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._snackBar.success(res.message);
          this.onClose(true);
        },
        error: (err: IApiResponseError) => {
          this._snackBar.error(err.message);
        },
      });
  }

  onSubmit() {
    if (this.portfolioForm.valid) {
      const values: IPortfolioFormVal = this.portfolioForm.getRawValue();

      const formData = new FormData();

      formData.append('image', values.image);
      if (values.caption) {
        formData.append('caption', values.caption.trim());
      }

      this.addPortfolio(formData);
    } else {
      this.portfolioForm.markAllAsTouched();
    }
  }

  initForm() {
    this.portfolioForm = this._fb.group({
      image: [null, Validators.required],
      caption: '',
    });
  }

  ngOnInit(): void {
    console.log('h');
    this.initForm();
  }
}
