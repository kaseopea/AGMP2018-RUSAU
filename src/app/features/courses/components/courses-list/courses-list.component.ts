import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';
import { GlobalLoaderService } from '../../../../core/services/global-loader.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../reducers';
import { DeleteCourse } from '../../../../actions/courses.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  @Input() public data$: Observable<ICourse[]>;
  @Output() refresh = new EventEmitter<boolean>();
  public noDataMessage = 'No data. Feel free to add new course';
  private deleteCourseSubscription;

  constructor(private coursesService: CoursesService,
              private store: Store<State>) {
  }

  ngOnInit() {
  }

  onDeleted(courseId: number): boolean {
    this.store.dispatch(new DeleteCourse(courseId));

    // this.deleteCourseSubscription = this.coursesService.deleteCourse(courseId).subscribe((res) => {
    //   if (res.status === 200) {
    //     // time to update courses
    //     this.refresh.emit(true);
    //   }
    // });
    return false;
  }

  ngOnDestroy() {
    if (this.deleteCourseSubscription) {
      this.deleteCourseSubscription.unsubscribe();
    }
  }
}
