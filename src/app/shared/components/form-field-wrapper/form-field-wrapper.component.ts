import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field-wrapper',
  imports: [],
  templateUrl: './form-field-wrapper.component.html',
  styleUrl: './form-field-wrapper.component.scss',
})
export class FormFieldWrapperComponent {
  @Input() label!: string;
  @Input() isOptional = false;
}
