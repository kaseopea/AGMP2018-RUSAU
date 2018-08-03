import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesModule } from '../features/courses/courses.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';


@NgModule({
  imports: [
    CoreModule,
    CoursesModule,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  exports: [DashboardComponent, LoginComponent],
  declarations: [DashboardComponent, LoginComponent, ManageCourseComponent, NotfoundComponent, MainLayoutComponent]
})
export class PublicModule { }
