import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit, OnDestroy {
  @Input() public course: ICourse;
  @Input() public isNew: boolean;
  private courseSubscription;

  constructor(private coursesService: CoursesService, private router: Router) {
  }

  ngOnInit() {
    if (this.isNew) {
      this.course = this.coursesService.getDefaultEmptyCourse();
    }
  }

  onSubmit(f: NgForm) {
    console.warn('--------------------- onSubmit ---------------------');
    console.warn('Form value:', f.value);
    if (this.isNew) {
      console.warn('Add new course: ', this.course);
      this.courseSubscription = this.coursesService
        .addCourse(this.course)
        .subscribe((res) => {
          if (res.status === 201) {
            this.router.navigateByUrl('/app/courses');
          }
        });

    } else {
      console.warn('Update new course: ', this.course);
      this.courseSubscription = this.coursesService
        .updateCourse(this.course.id, this.course)
        .subscribe((res) => {
          if (res.status === 200) {
            this.router.navigateByUrl('/app/courses');
          }
        });
    }
    return false;
  }

  cancelHandler() {
    this.router.navigateByUrl('/app/courses');
    return false;
  }

  ngOnDestroy() {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }
}
