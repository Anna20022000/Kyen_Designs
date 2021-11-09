import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';


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
    FileUploadModule,
    ReactiveFormsModule,
    NgbModule 

  ],
  exports:[
    DashboardComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    NgbModule
  ]
})
export class AdminModule { }
