import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  @Input() public course: ICourse;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    if (this.course) {
      console.log(this.course);
    } else {
      this.course = this.coursesService.getDefaultEmptyCourse();
    }
  }
}
