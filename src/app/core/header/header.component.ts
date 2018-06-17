import { Component, OnInit } from '@angular/core';
import { User } from '../../protected/user-profile/user';
import { UserProfile } from '../../protected/user-profile/user-profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: UserProfile = new UserProfile(101, 'kaseopea', 'Vitali', 'Rusau');

  constructor() { }

  ngOnInit() {
  }

}
