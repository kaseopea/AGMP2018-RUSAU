import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';
import { Store } from '@ngrx/store';
import { State } from '../../../../reducers';
import { AddCourse, UpdateCourse } from '../../../../actions/courses.actions';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  @Input() public course: ICourse;
  public isNew = true;
  public courseData: ICourse;

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.isNew = !this.course.id;
    this.courseData = this.course;
  }

  onSubmit() {
    const action = (this.isNew) ? new AddCourse(this.courseData) : new UpdateCourse(this.courseData);
    this.store.dispatch(action);
    return false;
  }

  cancelHandler() {
    this.router.navigateByUrl('/app/courses');
    return false;
  }
}
