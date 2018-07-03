import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from '../user-profile/model/user-profile.model';

@Component({
  selector: 'app-logged-user-menu',
  templateUrl: './logged-user-menu.component.html',
  styleUrls: ['./logged-user-menu.component.css']
})
export class LoggedUserMenuComponent implements OnInit {
  @Input() public userProfile: UserProfile;

  constructor() { }

  ngOnInit() {
  }

}
