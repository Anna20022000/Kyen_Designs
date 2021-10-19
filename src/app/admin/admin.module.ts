import { NgModule } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    PanelModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    MenubarModule

  ],
  exports:[
    DashboardComponent
  ]
})
export class AdminModule { }
