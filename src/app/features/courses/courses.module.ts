import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesItemComponent } from './courses-item/courses-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CoursesListComponent,
    CoursesItemComponent
  ],
  declarations: [
    CoursesListComponent,
    CoursesItemComponent
  ]
})
export class CoursesModule { }
