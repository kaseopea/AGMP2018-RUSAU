import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailResolveService implements Resolve<ICourse> {
  private DEFAULT_EMPTY_COURSE = {
    name: 'Default empty title to test',
    date: new Date(Date.now()),
    length: 100,
    description: 'Default course description',
    isTopRated: false,
    authors: [
      {
        id: '5b7a8462863c25502ed32168',
        name: 'Janna Kelly'
      },
      {
        id: '5b7a846270affc8f0438eddf',
        name: 'Solomon Dotson'
      },
      {
        id: '5b7a846297d0714fe5e92db8',
        name: 'Patrick Macdonald'
      }
    ]
  };

  constructor(private router: Router,
              private coursesService: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse> {
    const courseId = parseInt(route.paramMap.get('id'), 10) || null;
    if (!courseId) {
      return of(this.DEFAULT_EMPTY_COURSE);
    }
    return this.coursesService.getCourseById(courseId).pipe(
      take(1),
      map((course: ICourse) => (course) ? course : (this.router.navigateByUrl('/login'), null))
    );
  }
}
