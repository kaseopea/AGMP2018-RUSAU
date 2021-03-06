import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { AddEditCourseComponent } from './components/add-edit-course/add-edit-course.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { LoadMoreBtnComponent } from './components/load-more-btn/load-more-btn.component';
import { CourseHighlighterDirective } from './directives/course-highlighter.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { DateInputComponent } from './components/add-edit-course/date-input/date-input.component';
import { DurationInputComponent } from './components/add-edit-course/duration-input/duration-input.component';
import { AuthorsTagsComponent } from './components/add-edit-course/authors-tags/authors-tags.component';
import { FilterDateInputDirective } from './components/add-edit-course/date-input/validators/filter-date-input.directive';
import { DateTransformPipe } from './components/add-edit-course/date-input/pipes/date-transform.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CoursesListComponent,
    CourseItemComponent,
    AddEditCourseComponent,
    SearchCoursesComponent,
    LoadMoreBtnComponent
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
    DateTransformPipe,
    DateInputComponent,
    DurationInputComponent,
    AuthorsTagsComponent,
    FilterDateInputDirective
  ],
  providers: [
    FilterByPipe,
    DateTransformPipe
  ]
})
export class CoursesModule {
}
