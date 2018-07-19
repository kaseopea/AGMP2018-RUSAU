import { Route } from '@angular/router';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { LoginComponent } from './public/login/login.component';
import { ManageCourseComponent } from './public/manage-course/manage-course.component';

export const ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'manage-course',
    component: ManageCourseComponent
  },
  {
    path: 'manage-course/:id',
    component: ManageCourseComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
