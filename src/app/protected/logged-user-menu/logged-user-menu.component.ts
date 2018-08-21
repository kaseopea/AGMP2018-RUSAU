import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../user-profile/interfaces/iuser';
import { GlobalLoaderService } from '../../core/services/global-loader.service';

@Component({
  selector: 'app-logged-user-menu',
  templateUrl: './logged-user-menu.component.html',
  styleUrls: ['./logged-user-menu.component.css']
})
export class LoggedUserMenuComponent implements OnInit {
  public userProfile: IUser;

  constructor(private authService: AuthService,
              private router: Router,
              private loaderService: GlobalLoaderService) {
  }

  ngOnInit() {
    this.authService.GetUserInfo().subscribe((data) => this.userProfile = data);
  }

  public makeLogout(): void {
    this.loaderService.show();
    this.authService.Logout().subscribe(() => this.loaderService.hide());
    this.router.navigateByUrl('/login');
  }
}
