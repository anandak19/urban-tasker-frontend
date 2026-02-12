import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-table-filters',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './admin-table-filters.component.html',
  styleUrl: './admin-table-filters.component.scss',
})
export class AdminTableFiltersComponent implements OnInit {
  @Input() searchPlaceholder!: string;
  @Output() searchChange = new EventEmitter<string>();

  searchForm!: FormGroup;
  private _timerId: ReturnType<typeof setTimeout> | null = null;

  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      search: [''],
    });
  }

  onFormSubmit() {
    if (this._timerId) clearTimeout(this._timerId);

    this._timerId = setTimeout(() => {
      if (this.searchForm.valid) {
        const searchText = this.searchForm
          .get('search')
          ?.value?.trim() as string;

        this.searchChange.emit(searchText);
      }
    }, 1000);
  }
}
