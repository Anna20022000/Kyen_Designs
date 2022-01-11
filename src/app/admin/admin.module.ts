import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';

import {ChartModule} from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    CategoryComponent,
    OrderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    ChartModule,
    ToastModule

  ],
  exports:[
    DashboardComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbModule,
    ChartModule,
    ToastModule
  ],
  providers:[
    ChartModule,
    ToastModule
  ]
})
export class AdminModule { }
