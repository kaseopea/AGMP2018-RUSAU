import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ICourse } from '../interfaces/icourse';
import v1 from 'uuid/v1';

import { COURSES_MOCK } from '../../../mocks/coursesMock';
import { CourseItem } from '../model/course-item.model';
import { APPCONFIG } from '../../../config';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesList: ICourse[];

  constructor(private http: HttpClient) {
    this.coursesList = COURSES_MOCK;
  }

  public getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(APPCONFIG.apis.courses);
  }

  public getCoursesWithParams(params): Observable<ICourse[]> {
    // construct queryParams
    const queryParamsObj = {
      start: ((params.pageNumber - 1) * params.count).toString(),
      count: params.count.toString(),
      textFragment: ''
    };

    if (params.searchFor) {
      queryParamsObj.textFragment = params.searchFor;
    }

    const httpParams: HttpParams = new HttpParams({
      fromObject: queryParamsObj
    });

    return this.http.get<ICourse[]>(APPCONFIG.apis.courses, {params: httpParams});
  }

  public getCourseById(courseId: number): ICourse {
    return this.coursesList.find((course: ICourse) => course.id === courseId);
  }

  public addCourse(course: ICourse): void {
    this.coursesList.push(course);
  }

  public getDefaultEmptyCourse() {
    return new CourseItem(
      v1(),
      'Default empty title to test',
      new Date(Date.now()),
      0,
      '',
      false
    );
  }

  public updateCourse(courseId: number, updateCourse: ICourse): void {
    const courseIndex = this.coursesList.findIndex((course: ICourse) => course.id === courseId);
    this.coursesList[courseIndex] = updateCourse;
  }

  public deleteCourse(courseId: number): void {
    console.warn(`User wants to delete course with course id "${courseId}"`);
  }
}
