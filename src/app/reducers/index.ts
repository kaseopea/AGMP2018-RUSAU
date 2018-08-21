import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducer, AuthState } from './auth.reducer';
import { coursesReducer, CoursesState } from './courses.reducer';
import { uiReducer, UIState } from './ui.reducer';

export interface State {
  ui: UIState;
  user: AuthState;
  // courses: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer,
  // courses: coursesReducer,
  user: authReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/* SELECTORS */
export const selectUIState = (state: State) => state.ui;
export const selectUIIsLoading = createSelector(selectUIState, (state: UIState) => state.isLoading);

export const selectUserSate = (state: State) => state.user;
export const selectUserProfile = createSelector(selectUserSate, (state: AuthState) => state.profile);
