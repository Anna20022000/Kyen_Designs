import { Injector, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base-component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {

  items:any;
  total:any;
  
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this._cart.items.subscribe((res) => {
      this.items = res;
      this.total = 0;
      for(let x of this.items){ 
        x.money = x.quantity * x.product.price;
        this.total += x.money;
      } 
    });
  } 
  clearCart() { 
    this._cart.clearCart();
    alert('Xóa thành công');
  }
  addQty(item: any, quantity: any){ 
    item.quantity =  quantity;
    item.money =  Number.parseInt(item.quantity) *  item.product.price;
    this._cart.addQty(item);
  }

}
