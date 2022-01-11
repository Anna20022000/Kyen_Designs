import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from 'src/app/_hepers/auth.guard';




@NgModule({
  declarations: [
    CheckoutComponent,
    CartComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'cart', component: CartComponent},
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  ]),
  ],
  exports:[
    CheckoutComponent,
    CartComponent
  ]

})
export class ShopingModule { }
