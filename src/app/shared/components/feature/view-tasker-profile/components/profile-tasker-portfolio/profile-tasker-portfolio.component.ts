import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IBaseFilters } from '@shared/models/request-data.model';
import { IPortfolioImage } from '@shared/models/tasker-data.model';
import { IDeletePortfolioData } from '@shared/models/tasker-profile/tasker-profile.model';

@Component({
  selector: 'app-profile-tasker-portfolio',
  imports: [ButtonComponent, MatIconModule, CommonModule, PaginationComponent],
  templateUrl: './profile-tasker-portfolio.component.html',
  styleUrl: './profile-tasker-portfolio.component.scss',
})
export class ProfileTaskerPortfolioComponent implements OnInit {
  @Input() isEditable = false;
  @Input() allPortfolioImages = signal<IPortfolioImage[]>([]);
  @Input() portfolioPagination = signal<IPaginationMeta>({} as IPaginationMeta);

  @Output() isAddClicked = new EventEmitter();
  @Output() isDeleteClicked = new EventEmitter<IDeletePortfolioData>();
  @Output() getPortfolio = new EventEmitter<IBaseFilters>();

  gallaryImages = signal<string[]>([]);

  filter = signal<IBaseFilters>({} as IBaseFilters);

  private _confirmDialog = inject(ConfirmDialogService);

  onAddClick() {
    if (!this.isEditable) return;
    this.isAddClicked.emit();
  }

  onPageChange(page: number) {
    this.filter.update((curr) => ({ ...curr, page }));
    this.getPortfolioImages();
  }

  getPortfolioImages() {
    this.getPortfolio.emit(this.filter());
  }

  async onDeleteImage(id: string) {
    const yes = await this._confirmDialog.ask('Delete this image ?');
    if (yes) {
      this.isDeleteClicked.emit({ portfolioId: id, filter: this.filter() });
    }
  }

  ngOnInit(): void {
    console.log('Portfolio');
    this.getPortfolioImages();

    this.gallaryImages.set([
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
    ]);
  }
}
