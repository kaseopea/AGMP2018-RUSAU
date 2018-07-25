import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../user-profile/interfaces/iuser';

@Component({
  selector: 'app-logged-user-menu',
  templateUrl: './logged-user-menu.component.html',
  styleUrls: ['./logged-user-menu.component.css']
})
export class LoggedUserMenuComponent implements OnInit {
  public userProfile: IUser;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.userProfile = this.authService.GetUserInfo();
  }

  public makeLogout(): void {
    this.authService.Logout();
    this.router.navigateByUrl('/login');
  }
}
