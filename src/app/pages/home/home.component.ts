import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/base-component';
import { News } from 'src/app/models/news';
import { Product } from 'src/app/models/product';
import { NewsService } from 'src/app/services/news.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends BaseComponent implements OnInit {
  
  productsLatest ?: Product[];
  productsSalest ?: Product[];
  news ?: News[];

  constructor(injector: Injector, private productService:ProductService, private newsService: NewsService) { 
    super(injector);
  }

  ngOnInit(): void {
    this.getLatest();
    this.getSalest();
    this.getNews();
  }

  getLatest():void{
    this.productService.getProductLatest()
    .subscribe(
      data => {
        this.productsLatest = data;
        setTimeout(() =>
          this.loadScripts(), 500);
      },
      error =>{
        console.log(error);}
    )}
  getSalest(): void{
    this.productService.getProductSalest()
    .subscribe(
      data => {
        this.productsSalest = data;
        setTimeout(() =>
    this.loadScripts());
      }
    )}
  getNews():void{
    this.newsService.getLatest().subscribe(
      data => {
        this.news = data;
        setTimeout(() =>
    this.loadScripts());
      },
      error =>{
        console.log(error);
      }
  )}
  addToCart(it:Product, quantity: any) {
    let soLuong = Number.parseInt(quantity);
    let item ={product: it, quantity: soLuong};
    this._cart.addToCart(item);
    alert('Thêm sản phẩm vào giỏ hàng thành công!'); 
  }
}
