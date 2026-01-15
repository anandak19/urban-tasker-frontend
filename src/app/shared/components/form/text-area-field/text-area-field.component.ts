import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';

@Component({
  selector: 'app-text-area-field',
  imports: [FormFieldWrapperComponent, CommonModule],
  templateUrl: './text-area-field.component.html',
  styleUrl: './text-area-field.component.scss',
})
export class TextAreaFieldComponent implements ControlValueAccessor {
  ngControl = inject(NgControl, { optional: true, self: true });

  value = '';
  disabled = false;

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() isOptional = false;
  @Input() rows = 2;

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
  writeValue(value: string | null): void {
    this.value = value ?? '';
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

    if (errors['minlength']) {
      return `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;
    }

    if (errors['maxlength']) {
      return `${this.label} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    }

    if (errors['customError']) return errors['customError'];

    if (errors['pattern']) return `${this.label} has invalid format`;

    return 'Invalid value';
  }
}
