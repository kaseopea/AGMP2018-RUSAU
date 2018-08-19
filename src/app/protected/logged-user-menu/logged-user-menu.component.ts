import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../user-profile/interfaces/iuser';
import { GlobalLoaderService } from '../../core/services/global-loader.service';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { AuthLogout } from '../../actions/auth.actions';

@Component({
  selector: 'app-logged-user-menu',
  templateUrl: './logged-user-menu.component.html',
  styleUrls: ['./logged-user-menu.component.css']
})
export class LoggedUserMenuComponent implements OnInit {
  public userProfile: IUser;

  constructor(private authService: AuthService,
              private router: Router,
              private loaderService: GlobalLoaderService,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.store.select(state => state.user).subscribe((data) => this.userProfile = data.profile);
  }

  public makeLogout(): void {
    this.store.dispatch(new AuthLogout());
  }
}
