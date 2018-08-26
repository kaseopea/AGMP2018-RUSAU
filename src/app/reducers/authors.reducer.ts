import { AuthorsActions, AuthorsActionTypes } from '../actions/authors.actions';
import { IAuthor } from '../features/courses/interfaces/iauthor';


export interface AuthorsState {
  isLoading: boolean;
  loaded: boolean;
  authorsList: IAuthor[];
  errorMessage?: string;
}

export const initialState: AuthorsState = {
  isLoading: false,
  loaded: false,
  authorsList: []
};

export function authorsReducer(state = initialState, action: AuthorsActions): AuthorsState {
  switch (action.type) {

    // LOAD AUTHORS
    case AuthorsActionTypes.LoadAuthors:
      return {
        ...state,
        isLoading: true
      };

    case AuthorsActionTypes.LoadAuthorsSuccess:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        authorsList: [...action.authors]
      };

    case AuthorsActionTypes.LoadAuthorsFailed:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
