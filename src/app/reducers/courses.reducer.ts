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

    // ADD COURSE
    case CoursesActionTypes.AddCourseSuccess:
      return {
        ...state,
        data: [
          ...state.data,
          action.course
        ]
      };

    // UPDATE COURSE
    case CoursesActionTypes.UpdateCourseSuccess:
      return {
        ...state,
        data: state.data.map((course) => (course.id === action.course.id) ? Object.assign({}, course, action.course) : course)
      };

    // DELETE COURSE
    case CoursesActionTypes.DeleteCourseSuccess:
      return {
        ...state,
        data: state.data.filter(course => course.id !== action.deletedId)
      };

    default:
      return state;
  }
}
