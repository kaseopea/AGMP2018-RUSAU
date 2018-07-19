import {Injectable} from '@angular/core';
import {ICourse} from '../interfaces/icourse';

import {COURSES_MOCK} from '../../../mocks/coursesMock';

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

  public getCourseById(courseId: string): ICourse {
    return this.coursesList.find((course: ICourse) => course.id === courseId);
  }

  public addCourse(course: ICourse): void {
    this.coursesList.push(course);
  }

  public updateCourse(courseId: string, updateCourse: ICourse): void {
    const courseIndex = this.coursesList.findIndex((course: ICourse) => course.id === courseId);
    this.coursesList[courseIndex] = updateCourse;
  }

  public deleteCourse(courseId: string): void {
    for (let i = 0; i < this.coursesList.length; i++) {
      if (this.coursesList[i].id && this.coursesList[i].id === courseId) {
        this.coursesList.splice(i, 1);
        break;
      }
    }
  }
}
