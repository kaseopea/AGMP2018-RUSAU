import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ICourse } from '../interfaces/icourse';
import { CourseItemComponent } from './course-item.component';
import { COURSES_MOCK } from '../../../mocks/coursesMock';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let debugEl: DebugElement;
  const courseMock: ICourse = COURSES_MOCK[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;

    // find the course item DebugElement and element
    debugEl  = fixture.debugElement;

    // simulate the parent setting the input property
    component.courseItem = courseMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title', () => {
    const titleEl = debugEl.query(By.css('.card-title')).nativeElement;
    expect(titleEl.textContent).toContain(courseMock.title);
  });

  // it('should raise delete event when clicked (triggerEventHandler)', () => {
  //   const deleteBtnEl = debugEl.query(By.css('.btn-delete'));
  //   let selectedHero: Hero;
  //   component.delHandler.subscribe((courseId: number) => selectedHero = hero);
  //
  //   deleteBtnEl.triggerEventHandler('click', null);
  //   expect(selectedHero).toBe(expectedHero);
  // });
});
