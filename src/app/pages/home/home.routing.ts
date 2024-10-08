import { Routes } from '@angular/router';
import { HomeGuard } from './home.guard';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home.component').then((component) => component.HomeComponent),
    // canActivate: [HomeGuard],
    children: [
      {
        path: 'items',
        loadComponent: () =>
          import('./pages/items/items.component').then(
            (component) => component.ItemsComponent,
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then(
            (component) => component.OrdersComponent,
          ),
      },
      {
        path: 'cashier',
        loadComponent: () =>
          import('./pages/cashier/cashier.component').then(
            (component) => component.CashierComponent,
          ),
      },
      { path: '**', redirectTo: 'cashier', pathMatch: 'full' },
    ],
  },
];

export const HomeRoutes = routes;
