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
import { authorsReducer, AuthorsState } from './authors.reducer';

export interface State {
  ui: UIState;
  user: AuthState;
  courses: CoursesState;
  authors: AuthorsState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer,
  courses: coursesReducer,
  user: authReducer,
  authors: authorsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/* ====== SELECTORS ====== */

/* UI */
export const selectUIState = (state: State) => state.ui;
export const selectUIIsLoading = createSelector(selectUIState, (state: UIState) => state.isLoading);

/* User */
export const selectUserState = (state: State) => state.user;
export const selectUserProfile = createSelector(selectUserState, (state: AuthState) => state.profile);

/* Courses */
export const selectCoursesState = (state: State) => state.courses;
export const selectCoursesIsLoading = createSelector(selectCoursesState, (state: CoursesState) => state.isLoading);
export const selectCoursesIsLoaded = createSelector(selectCoursesState, (state: CoursesState) => state.loaded);
export const selectCoursesData = createSelector(selectCoursesState, (state: CoursesState) => state.data);

/* Authors */
export const selectAuthorsState = (state: State) => state.authors;
export const selectAuthorsList = createSelector(selectAuthorsState, (state: AuthorsState) => state.authorsList);
