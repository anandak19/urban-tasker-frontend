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
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
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
import { ICategoryData } from '@features/admin/models/category.interface';
import { ImageUploadFieldComponent } from '@shared/components/image-upload-field/image-upload-field.component';

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

  @Input() isEdit = false;

  isLoading = signal<boolean>(false);
  @Input() set loading(val: boolean) {
    this.isLoading.set(val);
  }

  @Input() categoryData = signal<ICategoryData | null>(null);

  @ViewChild('imageField') imageField!: ImageUploadFieldComponent;

  constructor() {
    effect(() => {
      const data = this.categoryData();
      if (!data) return;
      this.patchForm(data);
    });
  }

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
    console.log('subcat', this.subcategoryForm.value);
    if (this.subcategoryForm.valid) {
      // create formdata
      const formData = new FormData();
      // apend name
      formData.append('name', this.subcategoryForm.get('name')?.value);
      // append disc
      formData.append(
        'description',
        this.subcategoryForm.get('description')?.value.trim(),
      );

      const imageControlVal = this.subcategoryForm.get('image')?.value;
      if (imageControlVal instanceof File) {
        // append image
        formData.append('image', imageControlVal);
      }
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

  patchForm(subcategory: ICategoryData) {
    if (subcategory) {
      this.subcategoryForm.patchValue({
        name: subcategory.name,
        description: subcategory.description,
        image: subcategory.image,
      });
      this.imageField.displayImage(subcategory.image);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
}
