import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductWishlistComponent } from './product-wishlist/product-wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'product-checkout', component: ProductCheckoutComponent },
  { path: 'wish-list', component: ProductWishlistComponent },
  { path: 'checkout', component: ProductCheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
