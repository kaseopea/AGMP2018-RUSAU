import { Action } from '@ngrx/store';
import { ICourse } from '../features/courses/interfaces/icourse';


export interface CoursesState {
  data: Array<ICourse>;
}

export const initialState: CoursesState = {
  data: []
};

export function coursesReducer(state = initialState, action: Action): CoursesState {
  switch (action.type) {

    default:
      return state;
  }
}
