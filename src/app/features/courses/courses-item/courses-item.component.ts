import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseItem } from '../model/course-item.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.css']
})
export class CoursesItemComponent implements OnInit {
  @Input() public courseItem: CourseItem;
  @Output() delHandler = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteCourse(courseId: number): boolean {
    this.delHandler.emit(courseId);
    return false;
  }

}
