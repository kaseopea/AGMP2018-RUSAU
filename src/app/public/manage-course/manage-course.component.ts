import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ICourse } from '../../features/courses/interfaces/icourse';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit, OnDestroy {
  public course: ICourse;
  public pageTitle = '';
  public isNew = true;
  private readonly courseId: string;
  private courseSubscription;


  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.route.snapshot.data['title'];
  }

  ngOnInit() {
    if (this.courseId) {
      this.isNew = false;
      this.courseSubscription = this.coursesService
        .getCourseById(parseInt(this.courseId, 10))
        .subscribe((course) => this.course = course);
    }
  }

  ngOnDestroy() {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }


}
