import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IMatColumns } from '@shared/interfaces/table.interface';

@Component({
  selector: 'app-table-listing',
  imports: [MatTableModule],
  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss',
})
export class TableListingComponent<T> {
  @Input() columns!: IMatColumns[];
  @Input() dataSource: T[] = [];

  get displayedColumns(): string[] {
    return this.columns.map((c) => c.key as string);
  }
}
