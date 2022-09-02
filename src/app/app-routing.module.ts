import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { ProductComponent } from './page/product/product.component';
import { SaleComponent } from './page/sale/sale.component';
import { SalesListComponent } from './page/sales-list/sales-list.component';
import { GuardiaoGuard } from './service/guardiao.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'product', component: ProductComponent, canActivate: [GuardiaoGuard] },
  { path: 'sale', component: SaleComponent, canActivate: [GuardiaoGuard] },
  { path: 'sales', component: SalesListComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
