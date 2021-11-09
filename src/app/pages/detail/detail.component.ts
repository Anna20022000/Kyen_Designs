import { AfterViewInit, Component, Injector, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base-component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent extends BaseComponent implements OnInit {
  
  public id:any;
  public product!: Product;
  public spLienQuan!: Product[];

  constructor(injector: Injector, private productService: ProductService) { 
    super(injector);
  }
  ngOnInit(): void {
    window.scroll(0,0);
    this.route.params.subscribe(params => {
      this.id = params['idsp'];  
    });
    this.getSingle();
    this.getSPLQ();
  }

  addToCart(it:Product, quantity: any) {
    let soLuong = Number.parseInt(quantity);
    let item ={product: it, quantity: soLuong};
    this._cart.addToCart(item);
    alert('Thêm sản phẩm vào giỏ hàng thành công!'); 
  }

  getSingle(): void {
    this.productService.getSingle(this.id)
      .subscribe(
        data => {
          this.product = data;
        },
        error => {
          console.log(error);
        });
  }
  getSPLQ(): void {
    this.productService.getProductLatest()
      .subscribe(
        data => {
          this.spLienQuan = data;
          setTimeout(() => this.loadScripts());
        },
        error => {
          console.log(error);
        });
  }
}
