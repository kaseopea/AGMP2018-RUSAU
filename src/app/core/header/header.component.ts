import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../protected/user-profile/model/user-profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: UserProfile;

  constructor() { }

  ngOnInit() {
    this.profile = new UserProfile(101, 'kaseopea', 'Vitali', 'Rusau');
  }

}
