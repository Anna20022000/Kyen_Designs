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
  public idLSP : any;
  public product : Product = new Product;
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
  }

  addToCart(it:Product, quantity: any) {
    let soLuong = Number.parseInt(quantity);
    let item ={product: it, quantity: soLuong};
    this._cart.addToCart(item);
    alert('Thêm sản phẩm vào giỏ hàng thành công!'); 
  }

  /**
   * Get a product by id product
   */
  getSingle(): void {
    this.productService.getSingle(this.id)
      .subscribe(
        data => {
          this.product = data;
          this.idLSP = this.product.productCategory_Id;
          this.getSPLQ();
        },
        error => {
          console.log(error);
        });
  }
  
  /**
   * Get product family
   */
  getSPLQ(): void {
    this.productService.getProductByCategory(this.idLSP)
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
