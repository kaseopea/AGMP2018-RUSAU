import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ICourse } from '../../features/courses/interfaces/icourse';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit {
  public course: ICourse;
  public pageTitle = '';
  private readonly courseId: string;


  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.route.snapshot.data['title'];
  }

  ngOnInit() {
    if (this.courseId) {
      this.course = this.coursesService.getCourseById(parseInt(this.courseId, 10));
    }
  }

}
