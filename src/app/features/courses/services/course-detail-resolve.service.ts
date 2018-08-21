import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailResolveService implements Resolve<ICourse> {
  constructor(private router: Router,
              private coursesService: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse> {
    const courseId = parseInt(route.paramMap.get('id'), 10);
    return this.coursesService.getCourseById(courseId).pipe(
      take(1),
      map((course: ICourse) => {
        if (course) {
          return course;
        } else {
          this.router.navigateByUrl('/login');
          return null;
        }
      })
    );
  }
}
