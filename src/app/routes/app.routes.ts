import {Routes} from '@angular/router';
import {DashboardComponent, LoginPageComponent, RegisterPageComponent} from '../../pages';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'sign-up',
        component: RegisterPageComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
