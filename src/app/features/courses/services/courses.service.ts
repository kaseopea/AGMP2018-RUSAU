import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/icourse';

import { COURSES_MOCK } from '../../../mocks/coursesMock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesList: ICourse[];

  constructor() {
    this.coursesList = COURSES_MOCK;
  }

  public getCourses(): ICourse[] {
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
