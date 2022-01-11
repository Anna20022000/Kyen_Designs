import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base-component';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {

  @Input() product !: Product;
  
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
  }

  addToCart(it:Product, quantity: any) {
    let soLuong = Number.parseInt(quantity);
    let item ={product: it, quantity: soLuong};
    this._cart.addToCart(item);
    alert('Thêm thành công!');
  }

}
