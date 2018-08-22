import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { delay, map } from 'rxjs/operators';
import { ICourse } from '../interfaces/icourse';
import { APPCONFIG } from '../../../config';
import { ICourseQueryParams } from '../interfaces/iCourseQueryParams';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private BASE_URL = APPCONFIG.apis.courses;
  private REQUEST_DELAY = 500;

  constructor(private http: HttpClient) {}

  public getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.BASE_URL}`).pipe(delay(this.REQUEST_DELAY));
  }

  public getCoursesWithParams(params: ICourseQueryParams): Observable<ICourse[]> {
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

  public addCourse(course: ICourse): Observable<ICourse> {
    // delete course.id; // remove id property, it will be set automatically
    return this.http.post<ICourse>(`${this.BASE_URL}`, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(
      delay(this.REQUEST_DELAY),
      map((res) => (res.status === 201) ? <ICourse>res.body : null)
    );
  }

  public updateCourse(courseId: number, updateCourse: ICourse): Observable<ICourse> {
    return this.http.put(`${this.BASE_URL}/${courseId}`, updateCourse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(
      delay(this.REQUEST_DELAY),
      map((res) => (res.status === 200) ? <ICourse>res.body : null)
    );
  }

  public deleteCourse(courseId: number): Observable<number | null> {
    return this.http.delete(`${this.BASE_URL}/${courseId}`, {
      observe: 'response'
    }).pipe(
      delay(this.REQUEST_DELAY),
      map((res) => (res.status === 200) ? courseId : null)
    );
  }
}
