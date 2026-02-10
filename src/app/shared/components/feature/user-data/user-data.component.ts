import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUserData } from '@features/admin/models/user-data.interface';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';

@Component({
  selector: 'app-user-data',
  imports: [FormFieldWrapperComponent, TitleCasePipe],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  @Input() userData: IUserData | null = null;
}
