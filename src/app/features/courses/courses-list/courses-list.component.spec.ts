import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CourseItemComponent } from '../course-item/course-item.component';
import { LoadMoreBtnComponent } from '../load-more-btn/load-more-btn.component';
import { CoursesService } from '../services/courses.service';
import { COURSES_MOCK } from '../../../mocks/coursesMock';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent, CourseItemComponent, LoadMoreBtnComponent ],
      providers: [ CoursesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.coursesList = COURSES_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
