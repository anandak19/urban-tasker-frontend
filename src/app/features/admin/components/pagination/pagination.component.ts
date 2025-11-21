import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IPaginationMeta } from '@features/admin/models/common.interface';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Output() pageChange = new EventEmitter<number>();
  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  @Input() set paginationData(value: IPaginationMeta | null) {
    if (value) {
      this.pagination.set(value);
    }
  }

  get totalPages(): number {
    return this.pagination().pages;
  }

  get currentpage(): number {
    return this.pagination().page;
  }

  get isPrevDisabled(): boolean {
    return this.pagination().page <= 1;
  }

  get isNextDisabled(): boolean {
    return this.pagination().page >= this.totalPages;
  }

  get totalItems(): number {
    return this.pagination().total ?? 0;
  }

  goPrev(): void {
    if (!this.isPrevDisabled) this.pageChange.emit(this.pagination().page - 1);
  }

  goNext(): void {
    if (!this.isNextDisabled) this.pageChange.emit(this.pagination().page + 1);
  }
}
