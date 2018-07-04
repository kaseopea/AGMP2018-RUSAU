import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  public coursesList: ICourse[];

  constructor(private coursesService: CoursesService) {
    console.log(`# CoursesListComponent constructor`);
    this.coursesList = [];
  }

  ngOnChanges() {
    console.log(`# ngOnChanges`);
  }

  ngOnInit() {
    this.coursesList = this.coursesService.getCourses();
  }
  ngDoCheck() {
    console.log(`# ngDoCheck`);
  }

  ngAfterContentInit() {
    console.log(`# ngAfterContentInit`);
  }

  ngAfterContentChecked() {
    console.log(`# ngAfterContentChecked`);
  }

  ngAfterViewInit() {
    console.log(`# ngAfterViewInit`);
  }

  ngAfterViewChecked() {
    console.log(`# ngAfterViewChecked`);
  }

  ngOnDestroy()	{
    console.log(`# ngAfterContentInit`);
  }

  onDeleted(courseId: number): boolean {
    console.warn(`Trying to delete course with "${courseId}" id`);
    this.coursesService.deleteCourse(courseId);
    this.coursesList = this.coursesService.getCourses();
    return false;
  }
}
