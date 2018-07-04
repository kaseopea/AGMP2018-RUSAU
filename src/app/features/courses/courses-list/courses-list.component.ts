import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../model/course-item.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public coursesList: CourseItem[];

  constructor(private coursesService: CoursesService) {
    this.coursesList = [];
  }

  ngOnInit() {
    this.coursesList = this.coursesService.getCourses();
  }

  onDeleted(courseId: number): boolean {
    console.warn(`Trying to delete course with "${courseId}" id`);
    this.coursesService.deleteCourse(courseId);
    this.coursesList = this.coursesService.getCourses();
    return false;
  }
}
