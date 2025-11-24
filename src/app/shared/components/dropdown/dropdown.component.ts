import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IDropdownOption } from '@shared/models/form-inputs.model';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, MatIconModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() text = 'Select an option';
  @Input() options = signal<IDropdownOption[]>([]);

  @Input() isAutoClear = false;
  @Output() optionSelected = new EventEmitter<IDropdownOption>();

  selected!: IDropdownOption | null;

  isOpen = signal<boolean>(false);

  //gets control
  ngControl = inject(NgControl, { optional: true, self: true });
  private _elementRef = inject(ElementRef);

  constructor() {
    if (this.ngControl) {
      // tell angular that this compoent will be the control
      this.ngControl.valueAccessor = this;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: Event) {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen.set(false);
    }
  }

  toggleOption() {
    this.onTouched();
    this.isOpen.set(!this.isOpen());
  }

  selectOption(option: IDropdownOption) {
    this.optionSelected.emit(option);

    this.selected = option;
    this.writeValue(option);
    this.onChange(option);

    if (this.isAutoClear) {
      this.resetDropdown();
    }

    this.toggleOption();
  }

  resetDropdown() {
    this.selected = null;
    this.onChange(null);
    this.writeValue(null);
  }

  //form control methods

  // callbacks
  onChange: (value: IDropdownOption | null) => void = () => {
    //on change
  };
  onTouched: () => void = () => {
    //on touch
  };

  // control methods
  writeValue(value: IDropdownOption | null) {
    this.selected = value;
  }

  registerOnChange(fn: (value: IDropdownOption | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // getters
  get control() {
    return this.ngControl?.control;
  }

  get showError() {
    return this.control?.touched && this.control.invalid;
  }

  get errorMessage() {
    if (!this.control || !this.control.errors) return null;

    const errors = this.control.errors;

    if (errors['required']) return `Select an option`;
    else if (errors['customError']) return errors['customeError'];
    else return 'Invalid value';
  }
}
