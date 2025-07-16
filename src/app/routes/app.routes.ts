import {Routes} from '@angular/router';
import {authGuard} from '@app/routes/guards';
import {LoginPageComponent, RegisterPageComponent} from '@pages/auth';
import {DashboardComponent} from '@pages/dashboard';

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
