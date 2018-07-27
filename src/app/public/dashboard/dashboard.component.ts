import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../features/courses/services/courses.service';
import { FilterByPipe } from '../../features/courses/pipes/filter-by.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public filterCoursesBy: string;
  public filterByPipe: FilterByPipe;

  constructor(private coursesService: CoursesService, filterByPipe: FilterByPipe) {
    this.filterByPipe = filterByPipe;
  }

  ngOnInit() {
  }

  getFilteredCourses() {
    const courses = this.coursesService.getCourses();
    return (this.filterCoursesBy) ? this.filterByPipe.transform(courses, this.filterCoursesBy, false) : courses;
  }

  onSearch(query: string): boolean {
    console.warn(`Trying to filter courses with "${query}" id`);
    this.filterCoursesBy = query;
    return false;
  }
}
