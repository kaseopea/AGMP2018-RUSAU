import { User } from "./user";

export class UserProfile implements User {
  constructor(public id, public username, public firstName, public lastName) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
