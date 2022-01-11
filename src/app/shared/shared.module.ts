import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent, 
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    FooterComponent,HeaderComponent, UnauthorizedComponent
  ],
})
export class SharedModule { }
