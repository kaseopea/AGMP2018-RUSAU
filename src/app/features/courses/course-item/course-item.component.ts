import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICourse } from '../interfaces/icourse';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() public courseItem: ICourse;
  @Output() delHandler = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteCourse(courseId: number): boolean {
    this.delHandler.emit(courseId);
    return false;
  }

}
