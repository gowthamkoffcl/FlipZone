import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/app/service/product.service';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProductBuynowComponent } from './product-buynow/product-buynow.component';
import { AuthService } from 'src/app/service/auth.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductCheckoutComponent,

    ProductBuynowComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [ProductService, AuthService],
})
export class ProductModule {}
