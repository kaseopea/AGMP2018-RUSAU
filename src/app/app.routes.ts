import { Route } from '@angular/router';
import { DashboardComponent } from './public/dashboard/dashboard.component';

export const ROUTES: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
