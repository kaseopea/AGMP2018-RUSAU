import { IUser } from "../interfaces/iuser";

export class UserProfile implements IUser {
  constructor(public id, public username, public firstName, public lastName) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
