import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';
import { LoadMoreBtnComponent } from './load-more-btn/load-more-btn.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CoursesListComponent,
    CourseItemComponent,
    AddCourseComponent,
    SearchCoursesComponent
  ],
  declarations: [
    CoursesListComponent,
    CourseItemComponent,
    AddCourseComponent,
    SearchCoursesComponent,
    LoadMoreBtnComponent
  ]
})
export class CoursesModule { }
