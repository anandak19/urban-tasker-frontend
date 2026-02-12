import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ComplaintService } from '@features/user/services/complaints/complaint.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { finalize } from 'rxjs';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';

@Component({
  selector: 'app-complaint-form',
  imports: [
    PageTitleComponent,
    FormFieldWrapperComponent,
    TextAreaFieldComponent,
    CommonModule,
    ButtonLoadingComponent,
    MatIconModule,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.scss',
})
export class ComplaintFormComponent implements OnInit {
  @Input() taskId!: string;
  @Output() isComplaintCreated = new EventEmitter();

  private _complaintService = inject(ComplaintService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _fb = inject(FormBuilder);

  isLoading = signal<boolean>(false);

  complaintForm!: FormGroup;
  MAX_IMAGES = 3;

  initForm() {
    this.complaintForm = this._fb.group({
      complaint: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  createComplaint(formData: FormData) {
    console.log('calling');
    if (!this.taskId) return;
    console.log('calling now');

    this.isLoading.set(true);
    this._complaintService
      .createComplaint(this.taskId, formData)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbar.success(res.message);
          this.isComplaintCreated.emit();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  submitComplaint() {
    console.log('submited');

    if (this.complaintForm.invalid) {
      console.log('invalid');
      this.complaintForm.markAllAsTouched();
      return;
    }

    const complaintText = this.complaintForm.value.complaint;

    const formData = new FormData();
    //complaint
    formData.append('complaint', complaintText);
    //imagefiles
    this.selectedImageFiles.forEach((file) => {
      formData.append('images', file);
    });

    // call API
    this.createComplaint(formData);
  }

  images: string[] = [];
  selectedImageFiles: File[] = [];

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || this.images.length >= this.MAX_IMAGES) return;

    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result as string);
    };

    this.selectedImageFiles.push(file);
    reader.readAsDataURL(file);

    // reset input so same file can be selected again
    input.value = '';
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.selectedImageFiles.splice(index, 1);
  }

  ngOnInit(): void {
    this.initForm();
  }
}
