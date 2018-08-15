import { AppState } from '../interfaces/iAppState';

export function getInitialState(): AppState {
  return {
    auth: {
      userData: JSON.parse(localStorage.getItem('userData')),
      token: localStorage.getItem('token')
    }
  };
}