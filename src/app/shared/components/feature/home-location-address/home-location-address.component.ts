import { Component, Input } from '@angular/core';
import { IHomeAddress } from '@features/admin/models/user-data.interface';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';

@Component({
  selector: 'app-home-location-address',
  imports: [FormFieldWrapperComponent],
  templateUrl: './home-location-address.component.html',
  styleUrl: './home-location-address.component.scss',
})
export class HomeLocationAddressComponent {
  @Input() userLocation: IHomeAddress | null = null;
}
