import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICategoryData } from '@features/admin/models/category.interface';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ImageUploadFieldComponent } from '@features/admin/components/image-upload-field/image-upload-field.component';
import {
  nameValidator,
  noWhitespaceValidator,
} from '@shared/validators/custom-auth-validators';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ImageUploadFieldComponent,
    ButtonLoadingComponent,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  @Input() categoryData = signal<ICategoryData | null>(null);
  @Input() isEdit = false;
  @Output() formValues = new EventEmitter<FormData>();

  @ViewChild('imageField') imageField!: ImageUploadFieldComponent;

  // loading state
  isLoading = signal<boolean>(false);
  @Input() set loading(val: boolean) {
    this.isLoading.set(val);
  }

  categoryForm!: FormGroup;
  private _fb = inject(FormBuilder);

  constructor() {
    effect(() => {
      const data = this.categoryData();
      if (!data) return;
      this.patchForm(data);
    });
  }

  // to reset the form, from parent
  resetForm() {
    this.categoryForm.reset();
    this.imageField.clearImage();
  }

  /**
   * On submitting the category form
   */
  onFormSubmit() {
    console.log('check this', this.categoryForm.value);

    if (this.categoryForm.valid) {
      // create instance of formData
      const categoryFormData = new FormData();
      // assign values to form data
      categoryFormData.append(
        'name',
        this.categoryForm.get('name')?.value.trim(),
      );

      const imageControlVal: File | string =
        this.categoryForm.get('image')?.value;
      if (imageControlVal instanceof File) {
        console.log('Its a file');
        categoryFormData.append('image', imageControlVal);
      }

      // pass the value to parent
      this.formValues.emit(categoryFormData);
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  initForm() {
    this.categoryForm = this._fb.group({
      name: ['', [Validators.required, noWhitespaceValidator, nameValidator]],
      image: [null, Validators.required],
    });
  }

  patchForm(category: ICategoryData) {
    if (category) {
      this.categoryForm.patchValue({
        name: category.name,
        image: category.image,
      });
      this.imageField.displayImage(category.image);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
}
