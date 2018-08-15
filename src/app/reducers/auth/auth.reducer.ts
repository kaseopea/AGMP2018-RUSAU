import { Action } from '@ngrx/store';
import { getInitialState } from '../state.model';
import { AUTH_ACTIONS } from './auth.actions';

export function reducer(state = getInitialState().auth, action: Action) {
  switch (action.type) {
    case AUTH_ACTIONS.login:
      return {
        ...state,
        ...(action as any).payload
      };

    case AUTH_ACTIONS.logout:
      return {
        ...state,
        username: '',
        token: ''
      };

    default:
      return state;
  }
}