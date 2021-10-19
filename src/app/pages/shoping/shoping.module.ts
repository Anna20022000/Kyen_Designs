import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    CheckoutComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'checkout', component: CheckoutComponent},
  ]), // Append position
  ]
})
export class ShopingModule { }
