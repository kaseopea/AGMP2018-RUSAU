import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import {
  AddCourseFailed,
  AddCourseSuccess,
  CoursesActionTypes, DeleteCourseFailed,
  DeleteCourseSuccess,
  LoadCoursesFailed,
  LoadCoursesSuccess, UpdateCourseFailed, UpdateCourseSuccess
} from '../actions/courses.actions';
import { CoursesService } from '../features/courses/services/courses.service';
import { UIHideLoader, UIShowLoader } from '../actions/ui.actions';
import { Router } from '@angular/router';


@Injectable()
export class CoursesEffects {
  private REQUEST_DELAY = 500;
  private SHOW_LOADER_ACTIONS = [
    CoursesActionTypes.LoadCourses,
    CoursesActionTypes.AddCourse,
    CoursesActionTypes.UpdateCourse,
    CoursesActionTypes.DeleteCourse
  ];
  private HIDE_LOADER_ACTIONS = [
    CoursesActionTypes.LoadCoursesSuccess,
    CoursesActionTypes.LoadCoursesFailed,
    CoursesActionTypes.AddCourseSuccess,
    CoursesActionTypes.AddCourseFailed,
    CoursesActionTypes.UpdateCourseSuccess,
    CoursesActionTypes.UpdateCourseFailed,
    CoursesActionTypes.DeleteCourseSuccess,
    CoursesActionTypes.DeleteCourseFailed
  ];

  constructor(private actions$: Actions,
              private router: Router,
              private coursesService: CoursesService) {
  }

  // LOAD COURSES
  @Effect()
  loadCourses$: Observable<any> = this.actions$.pipe(
    ofType(CoursesActionTypes.LoadCourses),
    mergeMap(action => {
      return this.coursesService.getCoursesWithParams(action['params']).pipe(
        delay(this.REQUEST_DELAY),
        map((data) => new LoadCoursesSuccess(data)),
        catchError((err) => of(new LoadCoursesFailed(err)))
      );
    })
  );

  // ADD COURSE
  @Effect()
  addCourse$: Observable<any> = this.actions$.pipe(
    ofType(CoursesActionTypes.AddCourse),
    mergeMap(action => {
      return this.coursesService.addCourse(action['courseData']).pipe(
        delay(this.REQUEST_DELAY),
        map((course) => new AddCourseSuccess(course)),
        catchError((err) => of(new AddCourseFailed(err)))
      );
    })
  );

  @Effect({dispatch: false})
  addCourseSuccess$: Observable<any> = this.actions$.pipe(
    ofType(CoursesActionTypes.AddCourseSuccess),
    tap(() => {
      this.router.navigateByUrl('/app/courses');
    })
  );

  // UPDATE COURSE
  @Effect()
  updateCourse$: Observable<any> = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourse),
    mergeMap(action => {
      return this.coursesService.updateCourse(action['courseData'].id, action['courseData']).pipe(
        delay(this.REQUEST_DELAY),
        map((course) => new UpdateCourseSuccess(course)),
        catchError((err) => of(new UpdateCourseFailed(err)))
      );
    })
  );

  @Effect({dispatch: false})
  updateCourseSuccess$: Observable<any> = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourseSuccess),
    tap(() => {
      this.router.navigateByUrl('/app/courses');
    })
  );


  // DELETE COURSE
  @Effect()
  deleteCourse$: Observable<any> = this.actions$.pipe(
    ofType(CoursesActionTypes.DeleteCourse),
    mergeMap(action => {
      return this.coursesService.deleteCourse(action['courseId']).pipe(
        delay(this.REQUEST_DELAY),
        map((data) => new DeleteCourseSuccess(data)),
        catchError((err) => of(new DeleteCourseFailed(err)))
      );
    })
  );


  // SHOW LOADER
  @Effect()
  showLoader: Observable<any> = this.actions$.pipe(
    ofType(...this.SHOW_LOADER_ACTIONS),
    map(() => new UIShowLoader())
  );

  // HIDE LOADER
  @Effect()
  hideLoader$: Observable<any> = this.actions$.pipe(
    ofType(...this.HIDE_LOADER_ACTIONS),
    map(() => new UIHideLoader())
  );
}
