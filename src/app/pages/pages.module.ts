import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent,HomeComponent,DetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
      ListComponent, HomeComponent, DetailComponent
  ]
})
export class PagesModule { }
