import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { DropdownFieldComponent } from '@shared/components/dropdown-field/dropdown-field.component';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { IOptionData } from '@shared/models/form-inputs.model';
import { IBookTaskerAboutTask } from '@features/user/models/book-tasker/book-tasker.model';
import { TaskSize } from '@shared/constants/enums/task-size.enum';
import { BookTaskerService } from '@features/user/services/book-tasker/book-tasker/book-tasker.service';
import { CategoryService } from '@core/services/category/category.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SubCategoryService } from '@core/services/category/sub-category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-about-task',
  imports: [
    PageTitleComponent,
    TextAreaFieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    DropdownComponent,
    DropdownFieldComponent,
    FormFieldWrapperComponent,
  ],
  templateUrl: './about-task.component.html',
  styleUrl: './about-task.component.scss',
})
export class AboutTaskComponent implements OnInit {
  @Output() next = new EventEmitter();

  private _bookTaskerService = inject(BookTaskerService);
  private _categoryService = inject(CategoryService);
  private _subCategoryService = inject(SubCategoryService);
  private _snackbarService = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  onNext() {
    this.next.emit();
  }

  aboutTaskForm!: FormGroup;

  private fb = inject(FormBuilder);

  taskSizes = TaskSize;

  selectedSize: TaskSize | null = null;
  selectSize(size: TaskSize | null) {
    this.selectedSize = size;
    // assign value to form control
    this.aboutTaskForm.get('taskSize')?.setValue(size);
    this.aboutTaskForm.get('taskSize')?.markAsTouched();
  }

  categoryOptions = signal<IOptionData[]>([]);
  subCategoryOptions = signal<IOptionData[]>([]);
  sampleOptions = signal<IOptionData[]>([
    { id: 'sample1', label: 'Sample Cat' },
  ]);

  private initForm(): void {
    this.aboutTaskForm = this.fb.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      description: ['', [Validators.required]],
      taskSize: ['', Validators.required],
    });
  }

  // call api or cache data here
  submitAboutTask(aboutTaskData: IBookTaskerAboutTask) {
    console.log('Payload to backend:', aboutTaskData);
    this._bookTaskerService.saveAboutTask(aboutTaskData);
    this.onNext();
  }

  onSubmit(): void {
    console.log(this.aboutTaskForm.value);

    if (this.aboutTaskForm.invalid) {
      this.aboutTaskForm.markAllAsTouched();
      return;
    }

    const formValue = this.aboutTaskForm.value;

    const payload: IBookTaskerAboutTask = {
      categoryId: formValue.category?.id,
      subcategoryId: formValue.subcategory?.id,
      description: formValue.description,
      taskSize: formValue.taskSize as TaskSize,
    };
    this.submitAboutTask(payload);
  }

  onCategorySelect(categoryOption: IOptionData) {
    this._subCategoryService
      .getActiveSubcategoriesOptions(categoryOption.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.subCategoryOptions.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  getCategoryOptions() {
    this._categoryService
      .getCategoryOptions()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.categoryOptions.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.getCategoryOptions();
    this.initForm();
  }
}
