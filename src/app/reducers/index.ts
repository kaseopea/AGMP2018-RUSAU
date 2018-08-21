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
  courses: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer,
  courses: coursesReducer,
  user: authReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/* ====== SELECTORS ====== */

/* UI */
export const selectUIState = (state: State) => state.ui;
export const selectUIIsLoading = createSelector(selectUIState, (state: UIState) => state.isLoading);

/* User */
export const selectUserSate = (state: State) => state.user;
export const selectUserProfile = createSelector(selectUserSate, (state: AuthState) => state.profile);

/* Courses */
export const selectCoursesSate = (state: State) => state.courses;
export const selectCoursesIsLoading = createSelector(selectCoursesSate, (state: CoursesState) => state.isLoading);
export const selectCoursesIsLoaded = createSelector(selectCoursesSate, (state: CoursesState) => state.loaded);
export const selectCoursesData = createSelector(selectCoursesSate, (state: CoursesState) => state.data);
