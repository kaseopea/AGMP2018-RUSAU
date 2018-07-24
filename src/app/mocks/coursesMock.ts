import { CourseItem } from '../features/courses/model/course-item.model';
import { ICourse } from '../features/courses/interfaces/icourse';

export const COURSES_MOCK: ICourse[] = [
  new CourseItem(
    1,
    'Complete Intro to Web Development, v2',
    new Date(Date.now()),
    123,
    'More than an introduction, in this course you’ll go from building your first website to having the foundation for becoming a professional web developer!',
      true
  ),
  new CourseItem(
    2,
    'A Practical Guide to Algorithms with JavaScript',
    new Date(Date.now() - 100000000),
    234,
    'Learn to solve algorithms and analyze them efficiently in both an interview setting and also in your day-to-day development.',
      false
  ),
  new CourseItem(
    3,
    'Advanced React Patterns',
    new Date(Date.now() - 2000000000),
    345,
    'Simplify large React applications by separating your component logic, state and display properties to make React components more flexible and usable!',
      true
  ),
  new CourseItem(
    4,
    'Web Performance in react',
    new Date(Date.now() + 300000000),
    456,
    'Write more efficient JavaScript, optimize rendering performance, load assets faster with a CDN, split loading resources with Webpack and more!',
      false
  ),
  new CourseItem(
    5,
    'REST & GraphQL API Design in Node.js, v2 (using Express & MongoDB)',
    new Date(Date.now() - 4000000000),
    567,
    'Design APIs from the ground up using Node.js Express and MongoDB! You\'ll build a REST API and in the course you\'ll migrate your API to using GraphQL.',
      false
  )
];
