import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { ILoginData } from '@features/user/models/auth/login.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonComponent,
    MatProgressSpinner,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  @Input() isLoading = signal(false);
  @Output() login = new EventEmitter<ILoginData>();

  private _fb = inject(FormBuilder);

  resetForm() {
    setTimeout(() => {
      (document.activeElement as HTMLElement)?.blur();
      this.loginForm.reset();
      this.loginForm.markAsUntouched();
      this.loginForm.markAsPristine();
    }, 0);
  }

  onFormSubmit() {
    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.value as ILoginData);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  initializeForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
