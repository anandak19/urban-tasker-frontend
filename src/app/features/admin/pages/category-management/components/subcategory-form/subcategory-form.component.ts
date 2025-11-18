import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ImageUploadFieldComponent } from '@features/admin/components/image-upload-field/image-upload-field.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  nameValidator,
  noWhitespaceValidator,
} from '@shared/validators/custom-auth-validators';

@Component({
  selector: 'app-subcategory-form',
  imports: [
    FormFieldComponent,
    ImageUploadFieldComponent,
    ButtonLoadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.scss',
})
export class SubcategoryFormComponent implements OnInit {
  @Output() subcategoryFormData = new EventEmitter<FormData>();
  isLoading = signal<boolean>(false);
  @Input() set loading(val: boolean) {
    this.isLoading.set(val);
  }

  @ViewChild('imageField') imageField!: ImageUploadFieldComponent;

  subcategoryForm!: FormGroup;
  private _fb = inject(FormBuilder);

  resetForm() {
    this.subcategoryForm.reset();
    this.subcategoryForm.markAsUntouched();
    this.subcategoryForm.markAsPristine();
    this.imageField.clearImage();
  }

  /**
   * On submiting form
   */
  onFormSubmit() {
    if (this.subcategoryForm.valid) {
      console.log(this.subcategoryForm.value);

      // create formdata
      const formData = new FormData();
      // apend name
      formData.append('name', this.subcategoryForm.get('name')?.value);
      // append disc
      formData.append(
        'description',
        this.subcategoryForm.get('description')?.value.trim(),
      );
      // append image
      formData.append('image', this.subcategoryForm.get('image')?.value);
      // emit data
      this.subcategoryFormData.emit(formData);
    } else {
      this.subcategoryForm.markAllAsTouched();
    }
  }

  initForm() {
    this.subcategoryForm = this._fb.group({
      name: ['', [Validators.required, noWhitespaceValidator, nameValidator]],
      description: ['', [Validators.required]],
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
