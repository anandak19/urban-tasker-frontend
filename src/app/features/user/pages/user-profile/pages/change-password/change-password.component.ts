import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    BackButtonComponent,
    ButtonLoadingComponent,
    FormFieldComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;

  private _fb = inject(FormBuilder);

  private initForm(): void {
    this.passwordForm = this._fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) return;

    const { oldPassword, newPassword, confirmPassword } =
      this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      // handle mismatch (toast / error state)
      return;
    }

    // call API here
    console.log('Password updated', { oldPassword, newPassword });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
