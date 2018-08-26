import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../protected/user-profile/interfaces/iuser';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: IUser;
  public isAuthorized$: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isAuthorized$ = this.authService.IsAuthenticated();
  }

}
