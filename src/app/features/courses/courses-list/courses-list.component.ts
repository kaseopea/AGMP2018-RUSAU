import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../course-item';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public coursesList: CourseItem[] = [
    {
      id: 1,
      title: 'Video Course 1',
      creared: new Date(Date.now()),
      duration: 123,
      description: 'Great video course'
    },
    {
      id: 2,
      title: 'Video Course 2',
      creared: new Date(Date.now()),
      duration: 234,
      description: 'Another great video course'
    },
    {
      id: 3,
      title: 'Video Course 3',
      creared: new Date(Date.now()),
      duration: 345,
      description: 'Yet another great video course'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
