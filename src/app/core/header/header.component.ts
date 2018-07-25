import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IUser } from '../../protected/user-profile/interfaces/iuser';
import { USERPROFILE_MOCK } from '../../mocks/userProfileMock';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: IUser;
  public isAuthorized = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthorized = this.authService.IsAuthenticated();
    this.profile = USERPROFILE_MOCK;

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isAuthorized = this.authService.IsAuthenticated();
        }
      });
  }
}
