import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

@Component({
  selector: 'app-forgot-password',
  imports: [ButtonComponent, FormFieldComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  resetForm!: FormGroup;

  private _fb = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);

  onResetFormSubmit() {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

  initResetForm() {
    this.resetForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.initResetForm();
  }
}
