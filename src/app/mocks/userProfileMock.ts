import { UserProfile } from '../protected/user-profile/model/user-profile.model';
import { IUser } from '../protected/user-profile/interfaces/iuser';

export const USERPROFILE_MOCK: IUser = new UserProfile(101, '', { first: 'Vitali', last: 'Rusau' }, 'user@test.com', 'test');
