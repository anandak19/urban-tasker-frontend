import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../../../../shared/components/form-field/form-field.component';
import { SignupService } from '../../services/signup.service';
import { ButtonComponent } from "../../../../../../shared/components/button/button.component";

@Component({
  selector: 'app-password-form',
  imports: [FormFieldComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent implements OnInit {
  passwordForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();

  constructor(private _fb: FormBuilder, private _signupService: SignupService) {}

  initPasswordForm() {
    this.passwordForm = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // submit password OR singup complete
  submitPassword(){
    if(this.passwordForm.valid){
      this._signupService.signupUser(this.passwordForm.value)
      // after signup process complete show a message showing signup complete
      // stepper is completed - no more next page
      // user will gets logeed in, redirect to home page
    }else{
      this.passwordForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    this.initPasswordForm();
  }
}
