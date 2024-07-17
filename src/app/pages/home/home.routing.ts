import { Routes } from '@angular/router';
import { HomeGuard } from './home.guard';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home.component').then((component) => component.HomeComponent),
    canActivate: [HomeGuard],
    children: [
      {
        path: 'items',
        loadComponent: () =>
          import('./pages/items/items.component').then(
            (component) => component.ItemsComponent,
          ),
      },
      { path: '**', redirectTo: 'items', pathMatch: 'full' },
    ],
  },
];

export const HomeRoutes = routes;
