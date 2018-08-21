import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CoursesActionTypes, LoadCoursesFailed, LoadCoursesSuccess } from '../actions/courses.actions';
import { CoursesService } from '../features/courses/services/courses.service';
import { UIHideLoader, UIShowLoader } from '../actions/ui.actions';


@Injectable()
export class CoursesEffects {
  private REQUEST_DELAY = 500;
  private SHOW_LOADER_ACTIONS = [
    CoursesActionTypes.LoadCourses
  ];
  private HIDE_LOADER_ACTIONS = [
    CoursesActionTypes.LoadCoursesSuccess,
    CoursesActionTypes.LoadCoursesFailed
  ];

  constructor(private actions$: Actions,
              private coursesService: CoursesService) {}

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


  // // SHOW LOADER
  // @Effect()
  // showLoader: Observable<any> = this.actions$.pipe(
  //   ofType(...this.SHOW_LOADER_ACTIONS),
  //   map(() => new UIShowLoader())
  // );
  //
  // // HIDE LOADER
  // @Effect()
  // hideLoader$: Observable<any> = this.actions$.pipe(
  //   ofType(...this.HIDE_LOADER_ACTIONS),
  //   map(() => new UIHideLoader())
  // );
}
