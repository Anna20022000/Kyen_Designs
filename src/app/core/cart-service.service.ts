import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})

export class CartServiceService {
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items = this.itemsSubject.asObservable();

  
  constructor(private orderService : OrderService) 
  {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!local_storage) {
      local_storage = [];
    }
    this.itemsSubject.next(local_storage); 
  }
  
  // Add a product to shopping cart
  addToCart(item: any) {
    // item.quantity = 1;
    let local_storage:any;
    if (localStorage.getItem('cart') == null) {
      local_storage = [item];
    }
    else {
      local_storage = JSON.parse(localStorage.getItem('cart') || '[]');
      let ok = true;
      for (let x of local_storage) {
        // debugger;
        if (x.product.id == item.product.id) {
          x.quantity += item.quantity;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(item);
      } 
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  // Get all product in cart
  getItems() {
    if (localStorage.getItem('cart') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  deleteItem(item_id: number) {
    let local_storage = this.getItems().filter((x:any) => x.product.id != item_id);
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  /**
   * Thực hiện cập nhật số lượng của sản phẩm trong giỏ hàng
   * @param item Sản phẩm với số lượng đã được thay đổi
   */
  addQty(item: any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '[]');
    for (let x of local_storage) {
      if (x.product.id == item.product.id) {
        x.quantity = item.quantity;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('cart')!);
    return local_storage.length;
  }

  /**
   * Thực hiện xóa giỏ hàng
   */
  clearCart() {
  localStorage.removeItem('cart');
   this.itemsSubject.next(null as any);
  }
  
  /**
   * Thực hiện gọi API tạo đơn hàng
   * @param order Đối tượng đơn hàng
   */
  pay(order : any){
    this.orderService.createAnOrder(order)
    .pipe(first())
    .subscribe((response) => {
      this.clearCart();
      alert(response);
    });
  }
}
