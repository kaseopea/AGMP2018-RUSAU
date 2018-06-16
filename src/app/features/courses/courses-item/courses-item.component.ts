import { Component, OnInit, Input } from '@angular/core';
import { CourseItem } from '../course-item';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.css']
})
export class CoursesItemComponent implements OnInit {
  @Input() public courseItem: CourseItem;

  constructor() { }

  ngOnInit() {
  }

}