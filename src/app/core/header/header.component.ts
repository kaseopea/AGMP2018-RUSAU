import { Component, OnInit } from '@angular/core';
import { User } from '../../protected/user-profile/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public profile: User = {
    id: 101,
    username: 'kaseopea',
    firstName: 'Vitali',
    lastName: 'Rusau'
  };
  constructor() { }

  ngOnInit() {
  }

}
