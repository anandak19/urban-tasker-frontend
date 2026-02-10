import { TestBed } from '@angular/core/testing';

import { BookTaskerService } from './book-tasker.service';

describe('BookTaskerService', () => {
  let service: BookTaskerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookTaskerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
