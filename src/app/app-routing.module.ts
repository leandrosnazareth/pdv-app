import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagarComponent } from './page/contas/pagar/pagar/pagar.component';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { TableComponent } from './page/table/table.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'table', component: TableComponent},
  {path: 'product', component: ProductComponent},
  {path: 'pagar', component: PagarComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
