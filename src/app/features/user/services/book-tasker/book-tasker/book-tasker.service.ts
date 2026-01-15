import { inject, Injectable, signal } from '@angular/core';
import {
  IBookTasker,
  IBookTaskerAboutTask,
  IBookTaskerTasker,
  IBookTaskerTimePlace,
  IGetAvailTaskers,
} from '@features/user/models/book-tasker/book-tasker.model';
import { TaskerService } from '../../tasker/tasker.service';
import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { HttpClient } from '@angular/common/http';
import { IBaseApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookTaskerService {
  private bookingData!: IBookTasker;
  private aboutTask!: IBookTaskerAboutTask;
  private whenWhere!: IBookTaskerTimePlace;
  private taskerData!: IBookTaskerTasker;

  private BOOKING_API_ENDPOINT = 'bookings';

  // sample
  availTaskers = signal<IListTasker[]>([]);
  // availTaskers = signal<IListTasker[]>([
  //   {
  //     userId: '6931d20a32022e46aec1be72',
  //     firstName: 'Arjun',
  //     lastName: 'Menon',
  //     hourlyRate: 500,
  //     rating: 4.5,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be73',
  //     firstName: 'Rahul',
  //     lastName: 'Nair',
  //     hourlyRate: 400,
  //     rating: 4.2,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be74',
  //     firstName: 'Suresh',
  //     lastName: 'Kumar',
  //     hourlyRate: 450,
  //     rating: 4.0,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be72',
  //     firstName: 'Arjun',
  //     lastName: 'Menon',
  //     hourlyRate: 500,
  //     rating: 4.5,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be73',
  //     firstName: 'Rahul',
  //     lastName: 'Nair',
  //     hourlyRate: 400,
  //     rating: 4.2,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be74',
  //     firstName: 'Suresh',
  //     lastName: 'Kumar',
  //     hourlyRate: 450,
  //     rating: 4.0,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be72',
  //     firstName: 'Arjun',
  //     lastName: 'Menon',
  //     hourlyRate: 500,
  //     rating: 4.5,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be73',
  //     firstName: 'Rahul',
  //     lastName: 'Nair',
  //     hourlyRate: 400,
  //     rating: 4.2,
  //   },
  //   {
  //     userId: '6931d20a32022e46aec1be74',
  //     firstName: 'Suresh',
  //     lastName: 'Kumar',
  //     hourlyRate: 450,
  //     rating: 4.0,
  //   },
  // ]);
  paginationData = signal<IPaginationMeta>({
    total: 0,
    page: 1,
    limit: 5,
    pages: 0,
  });

  filter = signal<IBaseFilters>({
    page: 1,
    limit: 5,
  });

  private _taskerService = inject(TaskerService);
  private _http = inject(HttpClient);

  saveAboutTask(aboutTaskData: IBookTaskerAboutTask) {
    this.aboutTask = aboutTaskData;
  }

  saveWhenWhere(whenWhereData: IBookTaskerTimePlace) {
    this.whenWhere = whenWhereData;
  }

  saveTaskerData(taskerData: IBookTaskerTasker) {
    this.taskerData = taskerData;
  }

  // PENDING
  bookTasker() {
    this.bookingData = {
      ...this.aboutTask,
      ...this.whenWhere,
      ...this.taskerData,
    };
    console.log('The complete data');
    console.log(this.bookingData);
    // remining logics
    return this._http.post<IBaseApiResponse>(
      this.BOOKING_API_ENDPOINT,
      this.bookingData,
    );
  }

  setAvailTaskers(taskers: IListTasker[]) {
    this.availTaskers.set(taskers);
  }

  getTaskers() {
    return this.availTaskers;
  }

  getAvailbleTaskers(filter: IBaseFilters = this.filter()) {
    const payload: IGetAvailTaskers = {
      city: this.whenWhere.city,
      date: this.whenWhere.date,
      latitude: this.whenWhere.location.latitude,
      longitude: this.whenWhere.location.longitude,
      time: this.whenWhere.time,
      subcategoryId: this.aboutTask.subcategoryId,
    };
    console.log('payload in avail taskers ', payload);

    this._taskerService.getAvailableTaskers(payload, filter).subscribe({
      next: (res) => {
        console.log(res);
        this.setAvailTaskers(res.data.documents);
        this.paginationData.set(res.data.meta);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
