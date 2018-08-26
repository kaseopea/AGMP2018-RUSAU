import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';
import { select, Store } from '@ngrx/store';
import { selectAuthorsList, selectCoursesData, State } from '../../../../reducers';
import { AddCourse, LoadCourses, UpdateCourse } from '../../../../actions/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAuthor } from '../../interfaces/iauthor';
import { LoadAuthors } from '../../../../actions/authors.actions';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  @Input() public course: ICourse;
  public isNew = true;
  public courseForm =  new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ]),
    date: new FormControl('', [Validators.required]),
    length: new FormControl('', [Validators.required]),
    authors: new FormControl('', [Validators.required])
  });
  public authorsList$: Observable<IAuthor[]>;

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<State>) {
  }

  get id() { return this.courseForm.get('id'); }
  get name() { return this.courseForm.get('name'); }
  get description() { return this.courseForm.get('description'); }
  get date() { return this.courseForm.get('date'); }
  get length() { return this.courseForm.get('length'); }
  get authors() { return this.courseForm.get('authors'); }

  ngOnInit() {
    this.isNew = !this.course.id;
    this.courseForm.patchValue({...this.course});

    // Test Authors List
    this.authorsList$ = this.store.pipe(select(selectAuthorsList));
    this.store.dispatch(new LoadAuthors());
    this.authorsList$.subscribe(data => console.warn(data));
  }

  onSubmit() {
    console.warn(this.courseForm.value);
    // const action = (this.isNew) ? new AddCourse(this.courseForm.value) : new UpdateCourse(this.courseForm.value);
    // this.store.dispatch(action);
    // return false;
  }

  cancelHandler() {
    this.router.navigateByUrl('/app/courses');
    return false;
  }
}
