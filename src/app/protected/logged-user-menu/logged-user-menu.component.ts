import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../user-profile/interfaces/iuser';
import { select, Store } from '@ngrx/store';
import { selectUserProfile, State } from '../../reducers';
import { AuthLogout } from '../../actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logged-user-menu',
  templateUrl: './logged-user-menu.component.html',
  styleUrls: ['./logged-user-menu.component.css']
})
export class LoggedUserMenuComponent implements OnInit {
  public profile$: Observable<IUser>;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.profile$ = this.store.pipe(select(selectUserProfile));
  }

  public makeLogout(): void {
    this.store.dispatch(new AuthLogout());
  }
}
