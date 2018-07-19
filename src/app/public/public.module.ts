import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesModule } from '../features/courses/courses.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { ManageCourseComponent } from './manage-course/manage-course.component';

@NgModule({
  imports: [
    CoreModule,
    CoursesModule,
    RouterModule
  ],
  exports: [DashboardComponent, LoginComponent],
  declarations: [DashboardComponent, LoginComponent, ManageCourseComponent]
})
export class PublicModule { }
