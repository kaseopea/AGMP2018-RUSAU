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
      title: 'Complete Intro to Web Development, v2',
      created: new Date(Date.now()),
      duration: 123,
      description: 'More than an introduction, in this course you’ll go from building your first website to having the foundation for becoming a professional web developer!'
    },
    {
      id: 2,
      title: 'A Practical Guide to Algorithms with JavaScript',
      created: new Date(Date.now() - 100000000),
      duration: 234,
      description: 'Learn to solve algorithms and analyze them efficiently in both an interview setting and also in your day-to-day development.'
    },
    {
      id: 3,
      title: 'Advanced React Patterns',
      created: new Date(Date.now() - 200000000),
      duration: 345,
      description: 'Simplify large React applications by separating your component logic, state and display properties to make React components more flexible and usable!'
    },
    {
      id: 4,
      title: 'Web Performance',
      created: new Date(Date.now() - 300000000),
      duration: 456,
      description: 'Write more efficient JavaScript, optimize rendering performance, load assets faster with a CDN, split loading resources with Webpack and more!'
    },
    {
      id: 5,
      title: 'REST & GraphQL API Design in Node.js, v2 (using Express & MongoDB)',
      created: new Date(Date.now()  - 400000000),
      duration: 567,
      description: 'Design APIs from the ground up using Node.js Express and MongoDB! You\'ll build a REST API and in the course you\'ll migrate your API to using GraphQL.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
