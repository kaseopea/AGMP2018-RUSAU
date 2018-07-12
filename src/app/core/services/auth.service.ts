import { Inject, Injectable } from '@angular/core';
import { IUser } from '../../protected/user-profile/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject('LOCALSTORAGE') private localStorage: any) {
  }

  public Login(login: string) {
    const token = this.generateToken();
  }

  public Logout(username: string): void {
    console.info(`### User "${username}" wants to logout`);
  }

  public IsAuthenticated(): boolean {
    console.log(this.generateToken());
    return false;
  }

  public GetUserInfo(): void {

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
