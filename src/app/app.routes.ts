import { Route } from '@angular/router';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { LoginComponent } from './public/login/login.component';

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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
