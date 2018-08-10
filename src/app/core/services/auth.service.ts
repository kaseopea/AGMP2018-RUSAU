import { Inject, Injectable } from '@angular/core';
import v1 from 'uuid/v1';
import { USERPROFILE_MOCK } from '../../mocks/userProfileMock';
import { IUser } from '../../protected/user-profile/interfaces/iuser';
import { ICreds } from '../interfaces/icreds';
import { ILocalStorage } from '../interfaces/iLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SUCCESS_LOGIN_MESSAGE = 'Logged in successfully!';
  private userData: IUser;
  private token: string;
  private isLoggedIn = false;
  private LS_KEYS = {
    token: 'token',
    userData: 'userData'
  };

  constructor(@Inject('LOCALSTORAGE') private localStorage: ILocalStorage) {
    this.token = this.getTokenFromStorage();
    this.userData = this.getUserDataFromStorage();

    if (this.token && this.userData) {
      this.isLoggedIn = true;
    }
  }

  public Login(credentials: ICreds) {
    // check id login is correct (simple check with mock data for now)
    if (credentials.login === USERPROFILE_MOCK.username) {
      this.token = v1();
      this.userData = USERPROFILE_MOCK;

      // setting data to storage
      this.setTokenToStorage(this.token);
      this.setUserDataToStorage(this.userData);
      this.isLoggedIn = true;
      console.log(`${this.SUCCESS_LOGIN_MESSAGE} | User: ${credentials.login} | Token: ${this.token}`);
    } else {
      this.isLoggedIn = false;
      console.error('Invalid credentials. Login is forbidden!');
    }
    return this.isLoggedIn;
  }

  public Logout(): void {
    console.warn(`${this.userData.username} wants to logout`);
    this.token = null;
    this.userData = null;
    this.isLoggedIn = false;
    this.clearStorageData();
  }

  public IsAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  public GetUserInfo(): IUser {
    return this.userData;
  }

  public clearStorageData() {
    this.localStorage.removeItem(this.LS_KEYS.token);
    this.localStorage.removeItem(this.LS_KEYS.userData);
  }

  // utils
  private getUserDataFromStorage() {
    return JSON.parse(this.localStorage.getItem(this.LS_KEYS.userData));
  }

  private getTokenFromStorage() {
    return this.localStorage.getItem(this.LS_KEYS.token);
  }

  private setTokenToStorage(token: string): void {
    this.localStorage.setItem(this.LS_KEYS.token, token);
  }

  private setUserDataToStorage(data: IUser): void {
    this.localStorage.setItem(this.LS_KEYS.userData, JSON.stringify(data));
  }

}
