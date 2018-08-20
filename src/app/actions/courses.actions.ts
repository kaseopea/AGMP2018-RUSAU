import { Action } from '@ngrx/store';

export enum CoursesActionTypes {
  LoadCoursess = '[Courses] Load Coursess'
}

export class LoadCoursess implements Action {
  readonly type = CoursesActionTypes.LoadCoursess;
}

export type CoursesActions = LoadCoursess;
