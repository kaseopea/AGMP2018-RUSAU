import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';
import { LoadMoreBtnComponent } from './load-more-btn/load-more-btn.component';
import { CourseHighlighterDirective } from './directives/course-highlighter.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { DateInputComponent } from './add-edit-course/date-input/date-input.component';
import { DurationInputComponent } from './add-edit-course/duration-input/duration-input.component';
import { AuthorsTagsComponent } from './add-edit-course/authors-tags/authors-tags.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CoursesListComponent,
    CourseItemComponent,
    AddEditCourseComponent,
    SearchCoursesComponent
  ],
  declarations: [
    CoursesListComponent,
    CourseItemComponent,
    AddEditCourseComponent,
    SearchCoursesComponent,
    LoadMoreBtnComponent,
    CourseHighlighterDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    DateInputComponent,
    DurationInputComponent,
    AuthorsTagsComponent
  ],
  providers: [
    FilterByPipe
  ]
})
export class CoursesModule {
}
