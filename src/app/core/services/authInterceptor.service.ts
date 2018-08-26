import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';
import { State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { IUser } from '../../protected/user-profile/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor, OnDestroy {
  private userState: IUser;
  private readonly profileSubscription;

  constructor(private authService: AuthService,
              private store: Store<State>) {
    this.profileSubscription = store.pipe(select((state) => state.user))
      .subscribe(userState => this.userState = userState.profile);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = (this.userState) ? this.userState.fakeToken : undefined;
    return next.handle((token) ? req.clone({
      headers: req.headers.set('Authorization', token)
    }) : req);
  }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }
}
