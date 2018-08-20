import { Action } from '@ngrx/store';
import { IGlobalLoaderState } from '../core/interfaces/iGlobalLoaderState';

export enum UIActionTypes {
  UIShowLoader = '[UI] Is loading, show loader',
  UIHideLoader = '[UI] Is not loading, hide loader'
}

export class UIShowLoader implements Action {
  readonly type = UIActionTypes.UIShowLoader;
}

export class UIHideLoader implements Action {
  readonly type = UIActionTypes.UIHideLoader;
}

export type UIActions = UIShowLoader | UIHideLoader;
