import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../features/courses/interfaces/icourse';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit {
  public course: ICourse;
  public pageTitle = '';
  public isNew = true;
  private readonly courseId: string;


  constructor(private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.route.snapshot.data['title'];
  }

  ngOnInit() {
    this.course = this.route.snapshot.data.course;

    if (this.courseId) {
      this.isNew = false;
    }
  }

}
