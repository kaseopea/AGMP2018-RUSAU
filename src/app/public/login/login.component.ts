import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICreds } from '../../core/interfaces/icreds';
import { selectUserState, State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { AuthLogin } from '../../actions/auth.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  public loginForm = new FormGroup({
    login: new FormControl(this.userCreds.login, [Validators.required]),
    password: new FormControl(this.userCreds.password, [Validators.required]),
  });
  private userDataSubscription;

  constructor(private store: Store<State>) {}

  get login() { return this.loginForm.get('login'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() {
    this.userDataSubscription = this.store.pipe(select(selectUserState))
      .subscribe(userData => {
        if (!userData.isLoggedIn && userData.errorMessage) {
          this.isAccessDenied = true;
        }
      });
  }

  doLogin() {
    this.store.dispatch(new AuthLogin({...this.loginForm.value}));
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
