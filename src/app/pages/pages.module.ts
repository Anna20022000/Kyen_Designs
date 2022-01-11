import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './shoping/cart/cart.component';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/profile/account.component';

@NgModule({
  declarations: [
    ListComponent,
    HomeComponent,
    DetailComponent,
    ProductComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbPaginationModule, //paginator angular bootstrap
    NgbAlertModule
  ],
  exports: [
    ListComponent,
    HomeComponent,
    DetailComponent
  ]
})
export class PagesModule { }
