import { IUser } from '../protected/user-profile/interfaces/iuser';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';


export interface AuthState {
  isLoggedIn: boolean;
  profile: IUser | undefined;
  errorMessage: string | undefined;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  profile: undefined,
  errorMessage: undefined
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.AuthLogin:
      return {...state};

    case AuthActionTypes.AuthLogout:
      return {
        ...state,
        isLoggedIn: false
        // profile: undefined
      };

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

    default:
      return state;
  }
}
