import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  @Input() public course: ICourse;

  constructor(private coursesService: CoursesService, private router: Router) {
  }

  ngOnInit() {
    if (!this.course) {
      this.course = this.coursesService.getDefaultEmptyCourse();
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log('Add/Edit form submit performed!');
    return false;
  }

  cancelHandler() {
    this.router.navigateByUrl('/dashboard');
    return false;
  }
}
