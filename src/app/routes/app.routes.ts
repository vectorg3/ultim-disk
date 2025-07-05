import {Routes} from '@angular/router';
import {LoginPageComponent, RegisterPageComponent} from '../../pages/auth';

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
  }
];
