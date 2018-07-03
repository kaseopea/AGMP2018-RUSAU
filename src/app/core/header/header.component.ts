import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../protected/user-profile/model/user-profile.model';
import { USERPROFILE_MOCK } from '../../mocks/userProfileMock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: UserProfile;

  constructor() { }

  ngOnInit() {
    this.profile = USERPROFILE_MOCK;
  }

}
