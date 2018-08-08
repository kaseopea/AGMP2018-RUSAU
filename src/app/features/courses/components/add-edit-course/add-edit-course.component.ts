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
  private isNew = false;

  constructor(private coursesService: CoursesService, private router: Router) {
  }

  ngOnInit() {
    this.isNew = !this.course;
    console.log('this.isNew', this.isNew);
    if (!this.course) {
      this.course = this.coursesService.getDefaultEmptyCourse();
    }
  }

  onSubmit(f: NgForm) {
    console.warn('--------------------- onSubmit ---------------------');
    console.warn('Form value:', f.value);
    if (this.isNew) {
      console.warn('Add new course: ', this.course);
      this.coursesService.addCourse(this.course);
    } else {
      console.warn('Update new course: ', this.course);
      this.coursesService.updateCourse(this.course.id, this.course);
    }

    this.router.navigateByUrl('app/courses');
    return false;
  }

  cancelHandler() {
    this.router.navigateByUrl('app/courses');
    return false;
  }
}
