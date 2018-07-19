import {Component, Input, OnInit} from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input() public coursesList: ICourse[];
  public noDataMessage = 'No data. Feel free to add new course';

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit() {
  }

  onDeleted(courseId: number): boolean {
    console.warn(`Trying to delete course with "${courseId}" id`);
    this.coursesService.deleteCourse(courseId);
    this.coursesList = this.coursesService.getCourses();
    return false;
  }
}
