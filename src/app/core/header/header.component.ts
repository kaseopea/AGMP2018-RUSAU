import { Component, OnInit } from '@angular/core';
import { IUser } from '../../protected/user-profile/interfaces/iuser';
import { USERPROFILE_MOCK } from '../../mocks/userProfileMock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: IUser;

  constructor() { }

  ngOnInit() {
    this.profile = USERPROFILE_MOCK;
  }

}
