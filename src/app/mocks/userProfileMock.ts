import { UserProfile } from '../protected/user-profile/model/user-profile.model';
import { IUser } from '../protected/user-profile/interfaces/iuser';

export const USERPROFILE_MOCK: IUser = new UserProfile(101, 'user@test.com', 'Vitali', 'Rusau');
