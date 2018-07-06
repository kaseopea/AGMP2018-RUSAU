import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public filterCoursesBy: string;
  constructor() { }

  ngOnInit() {
  }

  onSearch(query: string): boolean {
      console.warn(`Trying to filter courses with "${query}" id`);
      this.filterCoursesBy = query;
      return false;
  }
}
