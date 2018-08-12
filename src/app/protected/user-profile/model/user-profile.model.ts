import { IUser } from '../interfaces/iuser';

export class UserProfile implements IUser {
  constructor(public id,
              public fakeToken = '',
              public name = { first: '', last: ''},
              public login,
              public password) {
    this.id = id;
    this.fakeToken = fakeToken;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
