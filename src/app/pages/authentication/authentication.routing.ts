import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./authentication.component').then(
        (componnet) => componnet.AuthenticationComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./login/login.component').then(
            (componnet) => componnet.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(
            (componnet) => componnet.RegisterComponent,
          ),
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./forgot-password/forgot-password.component').then(
            (componnet) => componnet.ForgotPasswordComponent,
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./change-password/change-password.component').then(
            (componnet) => componnet.ChangePasswordComponent,
          ),
      },
    ],
  },
];

export const AuthenticationRoutes = routes;
