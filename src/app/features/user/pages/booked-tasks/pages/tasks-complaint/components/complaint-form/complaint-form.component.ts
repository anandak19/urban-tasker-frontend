import { Component, inject, OnInit } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-complaint-form',
  imports: [
    PageTitleComponent,
    FormFieldWrapperComponent,
    TextAreaFieldComponent,
    CommonModule,
    ButtonLoadingComponent,
    MatIconModule,
  ],
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.scss',
})
export class ComplaintFormComponent implements OnInit {
  complaintForm!: FormGroup;
  MAX_IMAGES = 3;

  private _fb = inject(FormBuilder);

  initForm() {
    this.complaintForm = this._fb.group({
      complaint: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  submitComplaint() {
    if (this.complaintForm.invalid) {
      this.complaintForm.markAllAsTouched();
      return;
    }

    const complaintText = this.complaintForm.value.complaint;
    console.log('Complaint:', complaintText);

    // call API here
  }

  images: string[] = [];

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || this.images.length >= this.MAX_IMAGES) return;

    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result as string);
    };

    reader.readAsDataURL(file);

    // reset input so same file can be selected again
    input.value = '';
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  ngOnInit(): void {
    this.initForm();
  }
}
