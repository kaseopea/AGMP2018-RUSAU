import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICreds } from '../../core/interfaces/icreds';
import { selectUserSate, State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { AuthLogin } from '../../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public isAccessDenied: boolean;
  public userCreds: ICreds = {
    login: 'Morales',
    password: 'id'
  };
  private userDataSubscription;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.userDataSubscription = this.store.pipe(select(selectUserSate))
      .subscribe(userData => {
        if (!userData.isLoggedIn && userData.errorMessage) {
          this.isAccessDenied = true;
        }
      });
  }

  doLogin() {
    this.store.dispatch(new AuthLogin({
      login: this.userCreds.login,
      password: this.userCreds.password
    }));
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
