import { Action } from '@ngrx/store';
import { ICreds } from '../core/interfaces/icreds';
import { IUser } from '../protected/user-profile/interfaces/iuser';

export enum AuthActionTypes {
  AuthLogin = '[Auth] Login',
  AuthLoginSuccess = '[Auth] Login Success',
  AuthLoginFailed = '[Auth] Login Failed',
  AuthLogout = '[Auth] Logout',
  AuthLogoutSuccess = '[Auth] Logout Success',
  AuthLogoutFailed = '[Auth] Logout Failed'
}

export class AuthLogin implements Action {
  readonly type = AuthActionTypes.AuthLogin;

  constructor(public creds: ICreds) {
  }
}

// LOGIN
export class AuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.AuthLoginSuccess;

  constructor(public profile: IUser) {
  }
}

export class AuthLoginFailed implements Action {
  readonly type = AuthActionTypes.AuthLoginFailed;

  constructor(public errorMessage: string) {
  }
}

// LOGOUT
export class AuthLogout implements Action {
  readonly type = AuthActionTypes.AuthLogout;
}

export class AuthLogoutSuccess implements Action {
  readonly type = AuthActionTypes.AuthLogoutSuccess;

  constructor(public isAuthorized: boolean) {
  }
}

export class AuthLogoutFailed implements Action {
  readonly type = AuthActionTypes.AuthLogoutFailed;

  constructor(public errorMessage: string) {
  }
}


export type AuthActions = AuthLogin | AuthLogout | AuthLoginSuccess | AuthLoginFailed | AuthLogoutSuccess | AuthLogoutFailed;
