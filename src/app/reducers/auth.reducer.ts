import { IUser } from '../protected/user-profile/interfaces/iuser';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';


export interface AuthState {
  isLoggedIn: boolean;
  profile: IUser | undefined;
  errorMessage?: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  profile: undefined
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    // LOGIN
    case AuthActionTypes.AuthLogin:
      return {...state};

    case AuthActionTypes.AuthLoginSuccess:
      return {
        ...state,
        isLoggedIn: true,
        profile: action.profile
      };

    case AuthActionTypes.AuthLoginFailed:
      return {
        ...state,
        errorMessage: action.errorMessage
      };

    // LOGOUT
    case AuthActionTypes.AuthLogout:
      return {...state};

    case AuthActionTypes.AuthLogoutSuccess:
      return {
        ...state,
        isLoggedIn: false,
        profile: undefined
      };

    case AuthActionTypes.AuthLogoutFailed:
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
