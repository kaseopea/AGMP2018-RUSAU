import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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
  private BASEURL = APPCONFIG.apis.courses;

  constructor(private http: HttpClient) {
    this.coursesList = COURSES_MOCK;
  }

  public getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.BASEURL}`);
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
    return this.http.get<ICourse[]>(`${this.BASEURL}`, {params: httpParams});
  }

  public getCourseById(courseId: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.BASEURL}/${courseId}`);
  }

  public addCourse(course: ICourse): Observable<HttpResponse<any>> {
    return this.http.post<ICourse>(`${this.BASEURL}`, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    });
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

  public updateCourse(courseId: number, updateCourse: ICourse): Observable<HttpResponse<any>> {
    return this.http.put(`${this.BASEURL}/${courseId}`, updateCourse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    });
  }

  public deleteCourse(courseId: number): Observable<HttpResponse<any>> {
    console.warn(`User wants to delete course with course id "${courseId}"`);
    return this.http.delete(`${this.BASEURL}/${courseId}`, { observe: 'response' });
  }
}
