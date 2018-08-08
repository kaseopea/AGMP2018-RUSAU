import { Route } from '@angular/router';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { LoginComponent } from './public/login/login.component';
import { ManageCourseComponent } from './public/manage-course/manage-course.component';
import { NotfoundComponent } from './public/notfound/notfound.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { MainLayoutComponent } from './public/main-layout/main-layout.component';

export const ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'courses',
        component: DashboardComponent,
        // canActivate: [AuthGuardService],
        data: {
          title: 'Courses Dashboard'
        }
      },
      {
        path: 'courses/new',
        component: ManageCourseComponent,
        // canActivate: [AuthGuardService],
        data: {
          title: 'Add new course'
        }
      },
      {
        path: 'courses/:id',
        component: ManageCourseComponent,
        // canActivate: [AuthGuardService],
        data: {
          title: 'Update course data'
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent,
    data: {
      title: '404 Page was lost...'
    }
  }
];
