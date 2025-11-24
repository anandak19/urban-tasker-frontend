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

  @Input() label!: string; // Label for input *
  @Input() type = 'text'; // input type
  @Input() placeholder = ''; // placeholder
  @Input() id = ''; // optional id

  value = '';
  disabled = false;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // Callbacks
  onChange: (value: string) => void = () => {
    // on value change
  };
  onTouched: () => void = () => {
    // on touched
  };

  // Write value from parent form
  writeValue(value: string): void {
    this.value = value || '';
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

  /**
   * To reset from control from parent
   */
  resetControl(): void {
    if (this.control) {
      this.control.reset();
      this.value = '';
      this.onChange(this.value);
      this.control.markAsUntouched();
    }
  }

  // --- Getters

  // control getter
  get control() {
    return this.ngControl?.control;
  }

  // returns true if control has error
  get showError() {
    return this.control?.touched && this.control.invalid;
  }

  // return error message if control has error
  get errorMessage() {
    if (!this.control || !this.control.errors) return null;
    const errors = this.control.errors;

    if (errors['required']) return `${this.label} is required`;

    if (errors['minLength']) {
      return `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;
    }

    if (errors['maxlength']) {
      return `${this.label} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    }

    if (errors['email']) {
      return `Enter a valid email address`;
    }

    if (errors['customError']) return errors['customError'];

    if (errors['pattern']) return `${this.label} has invalid format`;

    return 'Invalid value';
  }
}
