import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  public appTitle: string;

  constructor() { }

  ngOnInit() {
    this.appTitle = 'videos';
  }

}
