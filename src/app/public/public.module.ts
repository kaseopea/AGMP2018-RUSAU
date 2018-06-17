import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesModule } from '../features/courses/courses.module';

@NgModule({
  imports: [
    CommonModule,
    CoursesModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent]
})
export class PublicModule { }
