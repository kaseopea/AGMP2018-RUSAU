import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css']
})
export class SearchCoursesComponent implements OnInit {
  public query = '';

  constructor() { }

  ngOnInit() {
    this.query = 'Default search value from component property';
  }

  searchHandler(queryElement: HTMLInputElement): boolean {
    console.log(`User performed click on search button and wants to search with "${queryElement.value}" query`);
    return false;
  }
}
