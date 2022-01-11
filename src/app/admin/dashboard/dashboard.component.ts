import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base-component';
import { first } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';


declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../layouts/admin/admin.component.css'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  DTs: number[]  = [0,0,0,0,0,0,0,0,0,0,0,0];
  year: number = 0;

  constructor(
    injector: Injector,
    private dashboardService: DashboardService
  ) { super(injector); }

  ngOnInit() {
    var today = new Date();
    this.year = today.getFullYear();

    this.getDTThang();
    

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };


  }
  getDTThang(): void {
    this.dashboardService.getDTThang()
      .subscribe(
        data => {
          for (let v of data) {
            this.DTs.splice(v.thang - 1, 1, v.dT);
          };
          this.basicData = {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
              {
                label: 'Doanh thu tháng',
                backgroundColor: '#019160',
                data: this.DTs
              }
            ]
          };

        },
        error => {
          console.log(error);
        });
  }
}