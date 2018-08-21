import { Action } from '@ngrx/store';
import { ICourseQueryParams } from '../features/courses/interfaces/iCourseQueryParams';
import { ICourse } from '../features/courses/interfaces/icourse';
import { HttpResponse } from '@angular/common/http';

export enum CoursesActionTypes {
  LoadCourses = '[Courses] Load Data',
  LoadCoursesSuccess = '[Courses] Successfully Loaded Data',
  LoadCoursesFailed = '[Courses] Failed to Load Data',
  AddCourse = '[Courses] Add course',
  AddCourseSuccess = '[Courses] Add course Success',
  AddCourseFailed = '[Courses] Fail Add course',
  UpdateCourse = '[Courses] Update Course',
  UpdateCourseSuccess = '[Courses] Update Course Success',
  UpdateCourseFailed = '[Courses] Failed Update Course',
  DeleteCourse = '[Courses] Delete Course',
  DeleteCourseSuccess = '[Courses] Delete Course Success',
  DeleteCourseFailed = '[Courses] Failed Delete Course',
}

/* ============= LoadCourses ============= */
export class LoadCourses implements Action {
  readonly type = CoursesActionTypes.LoadCourses;

  constructor(public params: ICourseQueryParams) {
  }
}

export class LoadCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.LoadCoursesSuccess;

  constructor(public data: Array<ICourse>) {
  }
}

export class LoadCoursesFailed implements Action {
  readonly type = CoursesActionTypes.LoadCoursesFailed;

  constructor(public errorMessage: string) {
  }
}

/* ============= AddCourse ============= */
export class AddCourse implements Action {
  readonly type = CoursesActionTypes.AddCourse;

  constructor(public params: ICourseQueryParams) {
  }
}

export class AddCourseSuccess implements Action {
  readonly type = CoursesActionTypes.AddCourseSuccess;

  constructor(public data: Array<ICourse>) {
  }
}

export class AddCourseFailed implements Action {
  readonly type = CoursesActionTypes.AddCourseFailed;

  constructor(public errorMessage: string) {
  }
}

/* ============= UpdateCourse ============= */
export class UpdateCourse implements Action {
  readonly type = CoursesActionTypes.UpdateCourse;

  constructor(public params: ICourseQueryParams) {
  }
}

export class UpdateCourseSuccess implements Action {
  readonly type = CoursesActionTypes.UpdateCourseSuccess;

  constructor(public data: Array<ICourse>) {
  }
}

export class UpdateCourseFailed implements Action {
  readonly type = CoursesActionTypes.UpdateCourseFailed;

  constructor(public errorMessage: string) {
  }
}

/* ============= DeleteCourse ============= */
export class DeleteCourse implements Action {
  readonly type = CoursesActionTypes.DeleteCourse;
  constructor(public courseId: number) {
  }
}

export class DeleteCourseSuccess implements Action {
  readonly type = CoursesActionTypes.DeleteCourseSuccess;
  constructor(public deletedId: number) {}
}

export class DeleteCourseFailed implements Action {
  readonly type = CoursesActionTypes.DeleteCourseFailed;

  constructor(public errorMessage: string) {
  }
}

export type CoursesActions = LoadCourses | LoadCoursesSuccess | LoadCoursesFailed
  | AddCourse | AddCourseSuccess | AddCourseFailed
  | UpdateCourse | UpdateCourseSuccess | UpdateCourseFailed
  | DeleteCourse | DeleteCourseSuccess | DeleteCourseFailed;
