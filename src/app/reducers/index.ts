import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducer, AuthState } from './auth.reducer';

export interface State {
  user: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  user: authReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
