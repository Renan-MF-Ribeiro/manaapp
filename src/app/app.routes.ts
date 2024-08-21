import { Routes } from '@angular/router';
import { AuthenticationRoutes } from './pages/authentication/authentication.routing';
import { HomeRoutes } from '@pages/home/home.routing';

export const routes: Routes = [
  ...AuthenticationRoutes,
  ...HomeRoutes,
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
