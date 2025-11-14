import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-table-listing',
  imports: [MatTableModule, ButtonComponent],
  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss',
})
export class TableListingComponent<T> {
  @Input() columns!: IMatColumns[]; // array of object containing column info
  @Input() dataSource: T[] = []; // array of data to show in table

  @Output() viewClicked = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<string>();

  get displayedColumns(): string[] {
    return [...this.columns.map((c) => c.key as string), 'actions'];
  }

  onViewBtnClick(id: string) {
    this.viewClicked.emit(id);
  }

  onEditBtnClick(id: string) {
    this.editClicked.emit(id);
  }
}
