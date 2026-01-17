import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-listing',
  imports: [MatTableModule, ButtonComponent, CommonModule, DatePipe],
  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss',
})
export class TableListingComponent<T> {
  @Input() columns!: IMatColumns[]; // array of object containing column info
  @Input() dataSource: T[] = []; // array of data to show in table
  @Input() editable = true;

  @Output() viewClicked = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<string>();

  get displayedColumns(): string[] {
    return [...this.columns.map((c) => c.key as string), 'actions'];
  }

  onViewBtnClick(id: string) {
    this.viewClicked.emit(id);
  }

  isDate(value: unknown): boolean {
    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }

    if (typeof value === 'string') {
      // strict ISO format check
      const isoRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?Z)?$/;
      if (!isoRegex.test(value)) return false;

      const date = new Date(value);
      return !isNaN(date.getTime());
    }
    return false;
  }

  onEditBtnClick(id: string) {
    this.editClicked.emit(id);
  }
}
