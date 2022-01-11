import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ClientComponent } from './layouts/client/client.component';
import { LoginComponent } from './login/login/login.component';
import { Role } from './models/role';
import { UnauthorizedComponent } from './shared/component/unauthorized/unauthorized.component';
import { AuthGuard, RoleGuard } from './_hepers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', loadChildren: () => 
      import('./layouts/admin/admin-layout.module').then(m => m.AdminLayoutModule),
      //middleware kiểm tra xem user đã đăng nhập chưa và có quyền của admin không
      canActivate: [AuthGuard,RoleGuard], data: { roles: [1] },
     }
    ]
  },
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', loadChildren: () => 
      import('./layouts/client/client.module').then(m => m.ClientModule),
       data: { preload: true, delay: true},
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // { path: '**', redirectTo:'/not-found', pathMatch:'full'},
  { path: 'unauthorized', component: UnauthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
