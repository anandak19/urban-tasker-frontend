/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TImageFile } from '@features/admin/models/category.interface';

@Component({
  selector: 'app-image-upload-field',
  imports: [MatIcon, ReactiveFormsModule, CommonModule],
  templateUrl: './image-upload-field.component.html',
  styleUrl: './image-upload-field.component.scss',
})
export class ImageUploadFieldComponent implements ControlValueAccessor {
  imageUrl = signal<TImageFile>(null);
  selectedImage: TImageFile = null;
  imageFile!: File | null; // controller value
  disabled = false;
  maxSizeInMB = 1;

  private ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ControlValueAccessor methods
  onChange: (value: File | null) => void = () => {
    console.log('Value changed');
  };

  onTouched: () => void = () => {
    console.log('Control touched');
  };

  writeValue(value: File | null) {
    if (value) {
      this.imageFile = value;
    } else {
      this.imageFile = null;
    }
  }

  // control state changing methods
  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // check if the size is not greater than limit
  isSizeError(size: number): boolean {
    const maxSizeInBytes = this.maxSizeInMB * 1024 * 1024;

    if (size > maxSizeInBytes) {
      this.writeValue(null);
      this.onChange(null);

      this.control?.setErrors({
        fileSize: `Image must be less than ${this.maxSizeInMB}MB`,
      });

      return true;
    }
    return false;
  }

  // to handle image input
  selectImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const inputImage = input.files[0];

      const isError = this.isSizeError(inputImage.size);
      if (isError) return;

      // write to controller
      this.writeValue(inputImage);
      this.onChange(inputImage);

      // to show the image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as TImageFile;
        this.imageUrl.set(this.selectedImage);
      };
      reader.readAsDataURL(inputImage);
    }
  }

  trigerFileInput(fileInput: HTMLInputElement) {
    if (!this.disabled) {
      fileInput.click();
    }
  }

  // --- Getters

  get control() {
    return this.ngControl?.control;
  }

  get showError() {
    return this.control?.touched && this.control?.invalid;
  }

  get errorMessage() {
    if (!this.control || !this.control.errors) return null;

    const errors = this.control.errors;

    if (errors['required']) return 'Image is requried';
    if (errors['fileSize']) return errors['fileSize'];

    return 'Invalid value';
  }
}
