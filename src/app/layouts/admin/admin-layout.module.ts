import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';

import { AdminModule } from 'src/app/admin/admin.module';
import { ProductComponent } from 'src/app/admin/product/product.component';
import { CategoryComponent } from 'src/app/admin/category/category.component';
import { OrderComponent } from 'src/app/admin/order/order.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AdminModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'admin', component: DashboardComponent},
      {path: 'admin/product', component: ProductComponent},
      {path: 'admin/category', component: CategoryComponent},
      {path: 'admin/order', component: OrderComponent},
    ])
  ]
})
export class AdminLayoutModule { }
