import { Injectable } from '@angular/core';
import { CourseItem } from '../model/course-item.model';

import { COURSES_MOCK } from '../../../mocks/coursesMock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesList: CourseItem[];

  constructor() {
    this.coursesList = COURSES_MOCK;
  }

  public getCourses(): CourseItem[] {
    return this.coursesList;
  }

  public deleteCourse(courseId: number): void {
    for (let i = 0; i < this.coursesList.length; i++) {
      if (this.coursesList[i].id && this.coursesList[i].id === courseId) {
        this.coursesList.splice(i, 1);
        break;
      }
    }
  }
}
