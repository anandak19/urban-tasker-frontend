import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import {
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() label!: string; // Label for input
  @Input() type: string = 'text'; // input type
  @Input() placeholder: string = ''; // placeholder
  @Input() id: string = ''; // optional id

  value: any = '';
  disabled = false;

  constructor(@Optional() @Self() public ngControl: NgControl){
    if(this.ngControl) {
      this.ngControl.valueAccessor = this
    }
  }

  // Callbacks
  onChange = (_: any) => {};
  onTouched = () => {};

  // Write value from parent form
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
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

  get control(){
    return this.ngControl?.control
  }

  get showError(){
    return this.control?.touched && this.control.invalid
  }

  get errorMessage(){
    if(!this.control || !this.control.errors) return null
    const errors = this.control.errors

    if(errors['required']) return `${this.label} is required`
    if(errors['minLength']) `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['email']) return `Enter a valid email address`;
    return 'Invalid value';
  }
}
