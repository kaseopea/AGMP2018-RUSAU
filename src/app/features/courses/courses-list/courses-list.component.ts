import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { CoursesService } from '../services/courses.service';
import { FilterByPipe } from '../pipes/filter-by.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnChanges {
  @Input() public filterBy: string;
  public coursesList: ICourse[];
  public noDataMessage = 'No data. Feel free to add new course';
  public filterByPipe: FilterByPipe;

  constructor(private coursesService: CoursesService, filterByPipe: FilterByPipe) {
    this.coursesList = [];
    this.filterByPipe = filterByPipe;
  }

  ngOnInit() {
    this.coursesList = this.getFilteredCourses();
  }

  ngOnChanges(changes) {
      this.coursesList = this.getFilteredCourses();
  }

  getFilteredCourses() {
    const courses = this.coursesService.getCourses();
    return (this.filterBy) ? this.filterByPipe.transform(courses, this.filterBy, false) : courses;
  }

  onDeleted(courseId: number): boolean {
    console.warn(`Trying to delete course with "${courseId}" id`);
    this.coursesService.deleteCourse(courseId);
    this.coursesList = this.coursesService.getCourses();
    return false;
  }
}
