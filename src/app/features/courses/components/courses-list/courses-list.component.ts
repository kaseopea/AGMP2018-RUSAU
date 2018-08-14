import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';
import { GlobalLoaderService } from '../../../../core/services/global-loader.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  @Input() public coursesList: ICourse[];
  @Output() refresh = new EventEmitter<boolean>();
  public noDataMessage = 'No data. Feel free to add new course';
  private deleteCourseSubscription;

  constructor(private coursesService: CoursesService,
              private loaderService: GlobalLoaderService) {
  }

  ngOnInit() {
  }

  onDeleted(courseId: number): boolean {
    this.loaderService.show();
    this.deleteCourseSubscription = this.coursesService.deleteCourse(courseId).subscribe((res) => {
      if (res.status === 200) {
        // time to update courses
        this.refresh.emit(true);
      }
      this.loaderService.hide();
    });
    return false;
  }

  ngOnDestroy() {
    if (this.deleteCourseSubscription) {
      this.deleteCourseSubscription.unsubscribe();
    }
  }
}
