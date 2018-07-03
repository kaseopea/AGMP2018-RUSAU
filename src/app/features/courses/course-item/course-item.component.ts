import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseItem } from '../model/course-item.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
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
