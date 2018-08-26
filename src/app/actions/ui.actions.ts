import { Action } from '@ngrx/store';

export enum UIActionTypes {
  UIShowLoader = '[UI] Show loader',
  UIHideLoader = '[UI] Hide loader'
}

export class UIShowLoader implements Action {
  readonly type = UIActionTypes.UIShowLoader;
}

export class UIHideLoader implements Action {
  readonly type = UIActionTypes.UIHideLoader;
}

export type UIActions = UIShowLoader | UIHideLoader;
