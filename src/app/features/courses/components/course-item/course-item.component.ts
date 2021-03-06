import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICourse } from '../../interfaces/icourse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() public courseItem: ICourse;
  @Output() delHandler = new EventEmitter<number>();
  private CONFIRM_DELETE_MESSAGE = 'Do you really want to delete?';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  editCourse(courseId: number) {
    this.router.navigate(['/app/courses/' + courseId]);
  }

  deleteCourse(courseId: number): boolean {
    if (window.confirm(this.CONFIRM_DELETE_MESSAGE)) {
      this.delHandler.emit(courseId);
    }
    return false;
  }

}
