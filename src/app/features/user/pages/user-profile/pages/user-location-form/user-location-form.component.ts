import { Component, signal } from '@angular/core';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { cities } from '@shared/constants/constants/city.constant';
import { IDropdownOption } from '@shared/models/form-inputs.model';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-user-location-form',
  imports: [
    BackButtonComponent,
    ButtonComponent,
    ButtonLoadingComponent,
    TextAreaFieldComponent,
    FormFieldWrapperComponent,
    DropdownComponent,
  ],
  templateUrl: './user-location-form.component.html',
  styleUrl: './user-location-form.component.scss',
})
export class UserLocationFormComponent {
  cities = signal<IDropdownOption[]>(cities);
}
