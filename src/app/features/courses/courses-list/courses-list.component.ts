import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../model/course-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public coursesList: CourseItem[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesList = this.coursesService.getCourses();
  }

}
