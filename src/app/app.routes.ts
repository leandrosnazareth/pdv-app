import { Routes } from '@angular/router';
import { authGuard } from './service/guardiao.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./page/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'app',
    loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'sale',
        pathMatch: 'full'
      },
      {
        path: 'sale',
        loadComponent: () => import('./page/sale/sale.component').then(m => m.SaleComponent)
      },
      {
        path: 'sales-list',
        loadComponent: () => import('./page/sales-list/sales-list.component').then(m => m.SalesListComponent)
      },
      {
        path: 'product',
        loadComponent: () => import('./page/product/product.component').then(m => m.ProductComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'app'
  }
];
