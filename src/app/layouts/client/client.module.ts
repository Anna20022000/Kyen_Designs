import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ListComponent } from 'src/app/pages/list/list.component';
import { DetailComponent } from 'src/app/pages/detail/detail.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { ShopingModule } from 'src/app/pages/shoping/shoping.module';
import { AuthGuard } from 'src/app/_hepers/auth.guard';
import { AccountComponent } from 'src/app/pages/account/profile/account.component';



@NgModule({
  declarations: [
  ],
  imports: [
    PagesModule,
    ShopingModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent},
      { path: 'list', component: ListComponent},
      { path: 'list/:idlsp', component: ListComponent},
      { path: 'detail/:idsp', component: DetailComponent},
      { path: 'account/profile', component: AccountComponent, canActivate: [AuthGuard]},
  ]), // Append position
  ]
})
export class ClientModule { }
