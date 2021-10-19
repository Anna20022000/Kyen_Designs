import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ListComponent } from 'src/app/pages/list/list.component';
import { DetailComponent } from 'src/app/pages/detail/detail.component';
import { ClientComponent } from './client.component';
import { PagesModule } from 'src/app/pages/pages.module';



@NgModule({
  declarations: [
  ],
  imports: [
    PagesModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent},
      { path: 'list', component: ListComponent},
      { path: 'list/:idlsp', component: ListComponent},
      { path: 'list/:idlsp/detail/:idsp', component: DetailComponent},
  ]), // Append position
  ]
})
export class ClientModule { }
