import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noWhitespaceValidator } from '@shared/validators/custom-auth-validators';
import { TaskService } from '@features/tasker/services/tasks/task.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-start-code-modal',
  imports: [ButtonComponent, ButtonLoadingComponent, ReactiveFormsModule],
  templateUrl: './start-code-modal.component.html',
  styleUrl: './start-code-modal.component.scss',
})
export class StartCodeModalComponent implements OnInit {
  startCodeForm!: FormGroup;
  isSubmitted = signal<boolean>(false);

  private _dialogRef = inject(DialogRef<{ isRefresh: boolean }>);
  private _snackbar = inject(SnackbarService);
  private _taskService = inject(TaskService);
  private _formBuilder = inject(FormBuilder);
  private _destroyRef = inject(DestroyRef);
  private _data: { taskId: string } = inject(DIALOG_DATA);

  submitCode(code: string) {
    if (!this._data.taskId) return;

    this._taskService
      .startTask(this._data.taskId, code)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this.close(true);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onSubmit() {
    this.isSubmitted.set(true);

    if (this.startCodeForm.invalid) {
      this.startCodeForm.markAllAsTouched();
      return;
    }

    const { startCode } = this.startCodeForm.getRawValue();

    const trimmedCode = startCode.trim();

    this.submitCode(trimmedCode);
  }

  close(isRefresh = false) {
    this._dialogRef.close({ isRefresh });
  }

  initStartCodeForm() {
    this.startCodeForm = this._formBuilder.group({
      startCode: ['', [Validators.required, noWhitespaceValidator]],
    });
  }

  get isCodeInvalid() {
    return (
      this.isSubmitted() &&
      this.startCodeForm.get('startCode')?.touched &&
      this.startCodeForm.get('startCode')?.invalid
    );
  }

  get errorText() {
    if (!this.isCodeInvalid) return '';
    const control = this.startCodeForm.get('startCode');

    if (control?.hasError('required')) {
      return 'Start code is required';
    } else if (control?.hasError('customError')) {
      return 'This field cannot be empty or whitespace';
    } else {
      return 'Invalid value';
    }
  }

  ngOnInit(): void {
    this.initStartCodeForm();
  }
}
