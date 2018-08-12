import { Component, OnInit } from '@angular/core';
import { IUser } from '../../protected/user-profile/interfaces/iuser';
import { AuthService } from '../services/auth.service';
import { GlobalLoaderService } from '../services/global-loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: IUser;
  public isAuthorized = false;

  constructor(private authService: AuthService, private loaderService: GlobalLoaderService) {}

  ngOnInit() {
    this.authService.IsAuthenticated().subscribe((isAuthenticated) => this.isAuthorized = isAuthenticated);
    this.loaderService.show();
    setTimeout(() => this.loaderService.hide(), 5000);
  }
}
