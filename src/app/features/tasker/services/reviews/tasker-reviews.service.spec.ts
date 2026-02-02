import { TestBed } from '@angular/core/testing';

import { TaskerReviewsService } from './tasker-reviews.service';

describe('TaskerReviewsService', () => {
  let service: TaskerReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
