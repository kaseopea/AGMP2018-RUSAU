import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css']
})
export class SearchCoursesComponent implements OnInit {
  @Output() searchHandler = new EventEmitter<string>();
  public query: string;

  constructor() { }

  ngOnInit() {
    this.query = 'react';
  }

  searchCourses(queryElement: HTMLInputElement): boolean {
    const query = queryElement.value;
    console.log(`User performed click on search button and wants to search with "${query}" query`);
    this.searchHandler.emit(query);
    return false;
  }
}
