import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { ICourse } from '../interfaces/icourse';
import { COURSES_MOCK } from '../../../mocks/coursesMock';
import { APPCONFIG } from '../../../config';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesList: ICourse[];
  private BASE_URL = APPCONFIG.apis.courses;
  private REQUEST_DELAY = 500;

  constructor(private http: HttpClient) {
    this.coursesList = COURSES_MOCK;
  }

  public getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.BASE_URL}`).pipe(delay(this.REQUEST_DELAY));
  }

  public getCoursesWithParams(params): Observable<ICourse[]> {
    // construct queryParams
    const queryParamsObj = {
      start: ((params.pageNumber - 1) * params.count).toString(),
      count: params.count.toString(),
      textFragment: ''
    };

    // if we search for some query
    if (params.searchFor) {
      queryParamsObj.textFragment = params.searchFor;
    }
    const httpParams: HttpParams = new HttpParams({
      fromObject: queryParamsObj
    });

    return this.http.get<ICourse[]>(`${this.BASE_URL}`, {params: httpParams}).pipe(delay(this.REQUEST_DELAY));
  }

  public getCourseById(courseId: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.BASE_URL}/${courseId}`).pipe(delay(this.REQUEST_DELAY));
  }

  public addCourse(course: ICourse): Observable<HttpResponse<any>> {
    delete course.id; // remove id property, it will be set automatically
    return this.http.post<ICourse>(`${this.BASE_URL}`, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(delay(this.REQUEST_DELAY));
  }

  public updateCourse(courseId: number, updateCourse: ICourse): Observable<HttpResponse<any>> {
    return this.http.put(`${this.BASE_URL}/${courseId}`, updateCourse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(delay(this.REQUEST_DELAY));
  }

  public deleteCourse(courseId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.BASE_URL}/${courseId}`, {
      observe: 'response'
    }).pipe(delay(this.REQUEST_DELAY));
  }
}
