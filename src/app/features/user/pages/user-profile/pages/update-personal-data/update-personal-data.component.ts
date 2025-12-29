import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { genders } from '@shared/constants/constants/gender-options.constant';
import { IDropdownOption } from '@shared/models/form-inputs.model';

@Component({
  selector: 'app-update-personal-data',
  imports: [
    FormFieldComponent,
    FormFieldWrapperComponent,
    DropdownComponent,
    ButtonLoadingComponent,
    BackButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './update-personal-data.component.html',
  styleUrl: './update-personal-data.component.scss',
})
export class UpdatePersonalDataComponent implements OnInit {
  personForm!: FormGroup;

  private _fb = inject(FormBuilder);

  userGender = signal<IDropdownOption[]>(genders);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.personForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.personForm.invalid) return;

    console.log('Updated details', this.personForm.value);
    // call API here
  }

  onBack(): void {
    // router navigation
  }
}
