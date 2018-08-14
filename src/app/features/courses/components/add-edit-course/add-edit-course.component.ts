import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../interfaces/icourse';
import { CoursesService } from '../../services/courses.service';
import { GlobalLoaderService } from '../../../../core/services/global-loader.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit, OnDestroy {
  @Input() public course: ICourse;
  public isNew = true;
  public courseData: ICourse;
  private courseSubscription;
  private defaultEmptyCourse = {
    id: 0,
    name: 'Default empty title to test',
    date: new Date(Date.now()),
    length: 0,
    description: '',
    isTopRated: false,
    authors: []
  };

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private router: Router,
              private loaderService: GlobalLoaderService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { course: ICourse }) => {
      this.courseData = (data.course) ? data.course : this.defaultEmptyCourse;
      this.isNew = !!!data.course;
    });
  }

  onSubmit() {
    this.loaderService.show();
    if (this.isNew) {
      console.warn('Add new course: ', this.courseData);
      this.courseSubscription = this.coursesService
        .addCourse(this.courseData)
        .subscribe((res) => {
          if (res.status === 201) {
            this.loaderService.hide();
            this.router.navigateByUrl('/app/courses');
          }
        });

    } else {
      console.warn('Update new course: ', this.courseData);
      this.courseSubscription = this.coursesService
        .updateCourse(this.courseData.id, this.courseData)
        .subscribe((res) => {
          if (res.status === 200) {
            this.loaderService.hide();
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
