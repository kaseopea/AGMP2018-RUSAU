import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../../reducers';
import { Store } from '@ngrx/store';
import { AddCourse, UpdateCourse } from '../../../../actions/courses.actions';
import { validateDuration } from './validators/valid-duration.validator';
import { validateRequiredAuthors } from './validators/required-authors.validator';
import { validateDate } from './validators/valid-date.validator';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  @Input() public course: ICourse;
  public isNew = true;
  public CONFIG = {
    nameMaxLength: 50,
    descriptionMaxLength: 500
  };

  public courseForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.CONFIG.nameMaxLength)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.CONFIG.descriptionMaxLength)
    ]),
    date: new FormControl('', [
      Validators.required,
      validateDate
    ]),
    length: new FormControl('', [
      Validators.required,
      validateDuration
    ]),
    authors: new FormControl([], [
      validateRequiredAuthors
    ])
  });


  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<State>) {
  }

  get id() {
    return this.courseForm.get('id');
  }

  get name() {
    return this.courseForm.get('name');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get date() {
    return this.courseForm.get('date');
  }

  get length() {
    return this.courseForm.get('length');
  }

  get authors() {
    return this.courseForm.get('authors');
  }

  ngOnInit() {
    this.isNew = !this.course.id;
    this.courseForm.patchValue({...this.course});
  }

  onSubmit() {
    const action = (this.isNew) ? new AddCourse(this.courseForm.value) : new UpdateCourse(this.courseForm.value);
    this.store.dispatch(action);
    return false;
  }

  cancelHandler() {
    this.router.navigateByUrl('/app/courses');
    return false;
  }
}
