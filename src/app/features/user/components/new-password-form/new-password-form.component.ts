import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import {
  passwordValidator,
  passwordMatchValidator,
} from '@shared/validators/custom-auth-validators';

@Component({
  selector: 'app-new-password-form',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonComponent,
    MatProgressSpinner,
  ],
  templateUrl: './new-password-form.component.html',
  styleUrl: './new-password-form.component.scss',
})
export class NewPasswordFormComponent implements OnInit {
  @Input() isLoading = signal(false);
  @Output() newPassword = new EventEmitter<string>();
  passwordForm!: FormGroup;

  private _fb = inject(FormBuilder);

  submitPasswordForm() {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.get('password')?.value;
      if (password) {
        this.newPassword.emit(password);
      }
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  initForm() {
    this.passwordForm = this._fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(6), passwordValidator],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );
  }

  ngOnInit(): void {
    this.initForm();
  }
}
