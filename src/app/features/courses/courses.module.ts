import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';
import { LoadMoreBtnComponent } from './load-more-btn/load-more-btn.component';
import {CourseHighlighterDirective} from './directives/course-highlighter.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

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
    LoadMoreBtnComponent,
    CourseHighlighterDirective,
    DurationPipe,
    OrderByPipe
  ]
})
export class CoursesModule { }
