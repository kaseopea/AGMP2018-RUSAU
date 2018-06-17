import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user-profile/user';

@Component({
  selector: 'app-logged-user-menu',
  templateUrl: './logged-user-menu.component.html',
  styleUrls: ['./logged-user-menu.component.css']
})
export class LoggedUserMenuComponent implements OnInit {
  @Input() public userProfile: User;

  constructor() { }

  ngOnInit() {
  }

}
