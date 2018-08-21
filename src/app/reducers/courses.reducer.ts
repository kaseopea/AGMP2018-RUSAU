import { ICourse } from '../features/courses/interfaces/icourse';
import { CoursesActions, CoursesActionTypes } from '../actions/courses.actions';


export interface CoursesState {
  isLoading: boolean;
  loaded: boolean;
  data: Array<ICourse>;
  errorMessage: string | undefined;
}

export const initialState: CoursesState = {
  isLoading: false,
  loaded: false,
  data: [],
  errorMessage: undefined
};

export function coursesReducer(state = initialState, action: CoursesActions): CoursesState {
  switch (action.type) {
    // LOAD COURSES
    case CoursesActionTypes.LoadCourses:
      return {
        ...state,
        isLoading: true,
        loaded: false
      };

    case CoursesActionTypes.LoadCoursesSuccess:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: [
          ...action.data
        ]
      };

    case CoursesActionTypes.LoadCoursesFailed:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        errorMessage: action.errorMessage
      };

    // DELETE COURSE
    case CoursesActionTypes.DeleteCourse:
      return {...state};

    case CoursesActionTypes.DeleteCourseSuccess:
      return {
        ...state,
        data: state.data.filter(course => course.id !== action.deletedId)
      };

    case CoursesActionTypes.DeleteCourseSuccess:
      return {...state};

    default:
      return state;
  }
}
