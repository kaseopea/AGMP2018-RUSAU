import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesModule } from '../features/courses/courses.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    CoursesModule
  ],
  exports: [DashboardComponent, LoginComponent],
  declarations: [DashboardComponent, LoginComponent]
})
export class PublicModule { }
