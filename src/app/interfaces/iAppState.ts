import { IUser } from '../protected/user-profile/interfaces/iuser';

export interface AppState {
  auth: {
    userData: IUser;
    token: string;
  };
}