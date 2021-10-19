import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateVNPipe } from './pipe/date.pipe';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DateVNPipe,FooterComponent,HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    DateVNPipe,FooterComponent,HeaderComponent
  ],
})
export class SharedModule { }
