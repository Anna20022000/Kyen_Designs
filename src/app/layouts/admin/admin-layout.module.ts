import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';

import { AdminModule } from 'src/app/admin/admin.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AdminModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'admin', component: DashboardComponent}
    ])
  ]
})
export class AdminLayoutModule { }
