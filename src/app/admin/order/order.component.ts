import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['../../layouts/admin/admin.component.css'],
})
export class OrderComponent implements OnInit {
  public page = 1;
  public pageSize = 10;
  public totalItems: any;

  filterOrderState: number = 0;

  order: any;
  orders: any[] = [];
  orderFilter: any[] = [];
  details: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }
  /**
   * Hàm lấy ra tất cả hóa đơn có phân trang
   * @param page trang muốn hiển thị
   * Author: CTKYen (19/11/2021)
   */
  loadPage(page: number) {
    this.orderService.getAll(page, this.pageSize).subscribe((data) => {
      this.orders = data.data;
      this.orderFilter = this.orders;
      this.totalItems = data.totalItems;
    });
  }

  filter() {
    if (this.filterOrderState == 0) {
      this.loadPage(1);
    }
    else if (this.filterOrderState == 1) {
      this.orders = this.orderFilter.filter((x: any) => x.state == false);
    }
    else if (this.filterOrderState == 2) {
      this.orders = this.orderFilter.filter((x: any) => x.state == true);
    }
  }

  /**
   * Hàm lấy ra chi tiết đơn hàng theo mã đh
   * @param hd hóa đơn
   * Author: CTKYen (19/11/2021)
   */
  showDetails(hd: any) {
    this.order = hd;
    debugger;
    this.orderService.getDetails(hd.id).subscribe((data) => {
      this.details = data;
    });
  }
}
