import { Routes } from '@angular/router';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { ProductDetailsComponent } from './app/components/product-details/product-details.component';

export const routes: Routes = [
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
];
