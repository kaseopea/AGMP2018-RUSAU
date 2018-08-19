import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';
import { State } from '../../reducers';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IUser } from '../../protected/user-profile/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private userState: IUser;

  constructor(private authService: AuthService,
              private store: Store<State>) {
    // get user state from store
    store.select((state) => state.user)
      .subscribe(userState => this.userState = userState.profile);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = (this.userState) ? this.userState.fakeToken : undefined;
    return next.handle((token) ? req.clone({
      headers: req.headers.set('Authorization', token)
    }) : req);
  }
}
