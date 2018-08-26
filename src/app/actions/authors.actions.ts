import { Action } from '@ngrx/store';
import { IAuthor } from '../features/courses/interfaces/iauthor';

export enum AuthorsActionTypes {
  LoadAuthors = '[Authors] Load Authors Data',
  LoadAuthorsSuccess = '[Authors] Authors Data loaded',
  LoadAuthorsFailed = '[Authors] Failed to load Authors Data'
}

export class LoadAuthors implements Action {
  readonly type = AuthorsActionTypes.LoadAuthors;
}

export class LoadAuthorsSuccess implements Action {
  readonly type = AuthorsActionTypes.LoadAuthorsSuccess;
  constructor(public authors: Array<IAuthor>) {}
}

export class LoadAuthorsFailed implements Action {
  readonly type = AuthorsActionTypes.LoadAuthorsFailed;

  constructor(public errorMessage: string) {}
}

export type AuthorsActions = LoadAuthors | LoadAuthorsSuccess | LoadAuthorsFailed;
