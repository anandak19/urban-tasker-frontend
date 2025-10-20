import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  ngControl = inject(NgControl, { optional: true, self: true });

  @Input() label!: string; // Label for input
  @Input() type = 'text'; // input type
  @Input() placeholder = ''; // placeholder
  @Input() id = ''; // optional id

  value = '';
  disabled = false;

  /** Inserted by Angular inject() migration for backwards compatibility */

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // Callbacks
  onChange: (value: string) => void = () => {
    console.log('Value changed');
  };
  onTouched: () => void = () => {
    console.log('Control touched');
  };

  // Write value from parent form
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Local input event
  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  get control() {
    return this.ngControl?.control;
  }

  get showError() {
    return this.control?.touched && this.control.invalid;
  }

  get errorMessage() {
    if (!this.control || !this.control.errors) return null;
    const errors = this.control.errors;

    if (errors['required']) return `${this.label} is required`;
    if (errors['minLength']) {
      return `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['email']) return `Enter a valid email address`;
    return 'Invalid value';
  }
}
