import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsAdminComponent } from './product/products-admin/products-admin.component';
import { ProductsComponent } from './product/products/products.component';

const routes: Routes = [
  { path: 'admin/products',data: {
    breadcrumb: 'Admin'}, component: ProductsAdminComponent },
  { path: 'products', data: {
    breadcrumb: 'Products'},component: ProductsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})

export class AppRoutingModule {}
