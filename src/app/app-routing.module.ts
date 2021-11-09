import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ClientComponent } from './layouts/client/client.component';

const routes: Routes = [
  { path: 'test', component: DashboardComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', loadChildren: () => import('./layouts/admin/admin-layout.module').then(m => m.AdminLayoutModule) }
    ]
  },
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', loadChildren: () => import('./layouts/client/client.module').then(m => m.ClientModule), data: { preload: true, delay: true }}
    ]
  }
  // { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuard], data: { preload: true, delay: true } },
  // { path: '**', redirectTo:'security/not-found', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
