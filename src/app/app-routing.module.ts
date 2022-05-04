import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthgaurdGuard } from './authgaurd.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/session/session.module').then((m) => m.SessionModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule),
    canActivate: [AuthgaurdGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
