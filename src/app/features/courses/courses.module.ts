import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CoursesListComponent,
    CoursesItemComponent,
    AddCourseComponent,
    SearchCoursesComponent
  ],
  declarations: [
    CoursesListComponent,
    CoursesItemComponent,
    AddCourseComponent,
    SearchCoursesComponent
  ]
})
export class CoursesModule { }
