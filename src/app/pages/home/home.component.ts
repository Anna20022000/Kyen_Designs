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

  /**
   * Get product latest
   */
  getLatest():void {
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
  
  /**
   * Get product salest
   * Author: ChuYen
   */
  getSalest(): void{
    this.productService.getProductSalest()
    .subscribe(
      data => {
        this.productsSalest = data;
        setTimeout(() =>
    this.loadScripts());
      }
    )}

    /**
     * Get new News
     * Author: ChuYen 
     */
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

}
