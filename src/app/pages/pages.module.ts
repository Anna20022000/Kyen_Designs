import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './shoping/cart/cart.component';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ListComponent,
    HomeComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbPaginationModule, NgbAlertModule //paginator angular bootstrap
  ],
  exports:[
      ListComponent, HomeComponent, DetailComponent
  ]
})
export class PagesModule { }
