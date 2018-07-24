import { Inject, Injectable } from '@angular/core';
import { USERPROFILE_MOCK } from '../../mocks/userProfileMock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SUCCESS_LOGIN_MESSAGE = 'Logged in successfully!';
  private token: string;
  private LS_KEYS = {
    token: 'token',
    userData: 'userData'
  };
  constructor(@Inject('LOCALSTORAGE') private localStorage: any) {
  }

  public Login(login: string) {
    this.token = this.generateToken();
    this.localStorage.setItem(this.LS_KEYS.token, this.token);
    this.localStorage.setItem(this.LS_KEYS.userData, JSON.stringify(USERPROFILE_MOCK));
    console.log(`${this.SUCCESS_LOGIN_MESSAGE} Token: ${this.token}`);
  }

  public Logout(): void {
    const userKey = JSON.parse(this.localStorage.getItem(this.LS_KEYS.userData)).username;
    console.warn(`${userKey} wants to logout`);
    this.localStorage.removeItem(userKey);
    this.localStorage.removeItem('token');
    this.token = '';

  }

  public IsAuthenticated(): boolean {
    const lsToken = this.localStorage.getItem(this.LS_KEYS.token);
    return this.token === lsToken;
  }

  public GetUserInfo(): string {
    return JSON.parse(this.localStorage.getItem(this.LS_KEYS.userData));
  }

  private generateToken(): string {
    const tokenLength = 15;
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?'];
    let token = '';
    for (let i = 1; i < tokenLength; i++) {
      token = token.concat(chars[Math.ceil(Math.random() * chars.length) - 1]);
    }
    return token;
  }

}
