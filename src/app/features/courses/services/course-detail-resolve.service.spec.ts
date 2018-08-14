import { TestBed, inject } from '@angular/core/testing';

import { CourseDetailResolveService } from './course-detail-resolve.service';

describe('CourseDetailResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseDetailResolveService]
    });
  });

  it('should be created', inject([CourseDetailResolveService], (service: CourseDetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});
