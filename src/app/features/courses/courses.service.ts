import { Injectable } from '@angular/core';
import { CourseItem } from './model/course-item.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor() { }

  public getCourses(): CourseItem[] {
    return [
      new CourseItem(1, 'Complete Intro to Web Development, v2', new Date(Date.now()), 123, 'More than an introduction, in this course you’ll go from building your first website to having the foundation for becoming a professional web developer!'),
      new CourseItem(2, 'A Practical Guide to Algorithms with JavaScript', new Date(Date.now() - 100000000), 234, 'Learn to solve algorithms and analyze them efficiently in both an interview setting and also in your day-to-day development.'),
      new CourseItem(3, 'Advanced React Patterns', new Date(Date.now() - 200000000), 345, 'Simplify large React applications by separating your component logic, state and display properties to make React components more flexible and usable!'),
      new CourseItem(4, 'Web Performance', new Date(Date.now() - 300000000), 456, 'Write more efficient JavaScript, optimize rendering performance, load assets faster with a CDN, split loading resources with Webpack and more!'),
      new CourseItem(5, 'REST & GraphQL API Design in Node.js, v2 (using Express & MongoDB)', new Date(Date.now() - 400000000), 567, 'Design APIs from the ground up using Node.js Express and MongoDB! You\'ll build a REST API and in the course you\'ll migrate your API to using GraphQL.')
    ];
  }
}
