import { Routes } from '@angular/router';
import { AuthenticationRoutes } from './pages/authentication/authentication.routing';

export const routes: Routes = [
  ...AuthenticationRoutes,
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
