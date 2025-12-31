import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
// import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { TaskerListingCardComponent } from './components/tasker-listing-card/tasker-listing-card.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IBookTaskerTasker } from '@features/user/models/book-tasker/book-tasker.model';
import { BookTaskerService } from '@features/user/services/book-tasker/book-tasker/book-tasker.service';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-choose-tasker',
  imports: [
    PageTitleComponent,
    TaskerListingCardComponent,
    ButtonComponent,
    PaginationComponent,
  ],
  templateUrl: './choose-tasker.component.html',
  styleUrl: './choose-tasker.component.scss',
})
export class ChooseTaskerComponent {
  private _bookTaskerService = inject(BookTaskerService);
  private _snackbarService = inject(SnackbarService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  @Output() prev = new EventEmitter();
  // sample addded
  availableTaskers = this._bookTaskerService.availTaskers;
  // sample added
  paginationData = this._bookTaskerService.paginationData;

  filter = this._bookTaskerService.filter;

  onTaskerPageChange(page: number) {
    this.filter.update((current) => ({
      ...current,
      page,
    }));
    // call the get Taskers method here from book service with pagination data here
    this._bookTaskerService.getAvailbleTaskers();
  }

  onPrev() {
    this.prev.emit();
  }

  // on choosing a tasker
  chooseTasker(taskerId: string) {
    const taskerData: IBookTaskerTasker = {
      taskerId,
    };
    this._bookTaskerService.saveTaskerData(taskerData);
    this.completeBooking();
    // call api to book tasker with the amount// open razorpay
  }

  // book tasker method
  completeBooking() {
    this._bookTaskerService
      .bookTasker()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbarService.success(res.message);
          this._router.navigate(['/tasks']);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbarService.error(err.message);
        },
      });
  }
}
