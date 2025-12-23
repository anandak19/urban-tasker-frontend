import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-field',
  imports: [],
  templateUrl: './dropdown-field.component.html',
  styleUrl: './dropdown-field.component.scss',
})
export class DropdownFieldComponent {
  @Input() label!: string;
  @Input() isOptional = false;
}
