import { Action } from '@ngrx/store';
import { ICourseQueryParams } from '../features/courses/interfaces/iCourseQueryParams';
import { ICourse } from '../features/courses/interfaces/icourse';

export enum CoursesActionTypes {
  LoadCourses = '[Courses] Load Data',
  LoadCoursesSuccess = '[Courses] Successfully Loaded Data',
  LoadCoursesFailed = '[Courses] Failed to Load Data'
}

export class LoadCourses implements Action {
  readonly type = CoursesActionTypes.LoadCourses;

  constructor(public params: ICourseQueryParams) {}
}

export class LoadCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.LoadCoursesSuccess;

  constructor(public data: Array<ICourse>) {}
}

export class LoadCoursesFailed implements Action {
  readonly type = CoursesActionTypes.LoadCoursesFailed;

  constructor(public errorMessage: string) {}
}

export type CoursesActions = LoadCourses | LoadCoursesSuccess | LoadCoursesFailed;
