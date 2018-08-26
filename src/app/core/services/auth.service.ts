import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { IUser } from '../../protected/user-profile/interfaces/iuser';
import { ICreds } from '../interfaces/icreds';
import { ILocalStorage } from '../interfaces/iLocalStorage';
import { APPCONFIG } from '../../config';
import { MessagesConstant } from '../constants/messages.constant';
import { GENERAL_CONST } from '../constants/general.constant';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;
  private profile: IUser;
  private isLoggedIn = false;
  private LS_KEYS = GENERAL_CONST.localStorage.keys;

  constructor(@Inject('LOCALSTORAGE') private localStorage: ILocalStorage,
              private http: HttpClient) {
     this.token = this.localStorage.getItem(this.LS_KEYS.token);
     this.profile = JSON.parse(this.localStorage.getItem(this.LS_KEYS.profile));

     if (this.token && this.profile) {
       this.isLoggedIn = true;
     }
  }

  public Login(credentials: ICreds): Observable<IUser> {
    // if user is already logged in
    if (this.isLoggedIn) {
      return of(this.profile);
    }

    // request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // request params
    const params = new URLSearchParams();
    params.set('login', credentials.login);
    params.set('password', credentials.password);

    // request
    return this.http.post(APPCONFIG.apis.auth, params.toString(), {headers}).pipe(
      map(data => this.processToken(data)),
      mergeMap(token => this.GetUserData(token)),
      map(data => this.processUserData(data)),
      catchError(this.handleLoginError)
    );
  }

  public Logout(): Observable<boolean> {
    this.isLoggedIn = false;
    return of(false);
  }

  public IsAuthenticated(): Observable<boolean> {
    return of(this.isLoggedIn);
  }

  // utils
  private processToken(tokenObj) {
    const {token} = tokenObj;
    return token;

  }

  private GetUserData(token: string): Observable<IUser> {
    // request headers
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post<IUser>(APPCONFIG.apis.userInfo, '', {headers});
  }

  private processUserData(userData: IUser) {
    this.isLoggedIn = true;
    return userData;
  }

  private handleLoginError(error: HttpErrorResponse) {
    return throwError((error.status === 401) ? MessagesConstant.auth.notAuthorized : MessagesConstant.auth.generalLoginError);
  }
}
