import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItem } from '../model/course-item.model';
import { CourseItemComponent } from './course-item.component';
import { COURSES_MOCK } from '../../../mocks/coursesMock';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  const inputCourse: CourseItem = COURSES_MOCK[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.courseItem = inputCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
