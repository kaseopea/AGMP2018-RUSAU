import { Action } from '@ngrx/store';
import { UIActionTypes } from '../actions/ui.actions';


export interface UIState {
  isLoading: boolean;
}

export const initialState: UIState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: Action): UIState {
  switch (action.type) {
    case UIActionTypes.UIShowLoader:
      return {
        ...state,
        isLoading: true
      };

    case UIActionTypes.UIHideLoader:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
