import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/base-component';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  idlsp: number = 0;
  products?: Product[];
  categories?: Category[];

  public list_item: any;
  public page = 1;
  public pageSize = 9;
  public totalItems:any;

  constructor(injector: Injector, private productService: ProductService, private categoryService: CategoryService) {
    super(injector);
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getAllCat();
    this.route.params.subscribe(param => {
      this.idlsp = param['idlsp'];
    });
    if (this.idlsp === undefined) {
      this.loadPage(1);
    }
    else this.getProductsByCat();
  }

  getAllProduct(): void {
    this.productService.getAll()
      .subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.log(error);
        });
  }

  getProductsByCat(): void {
    this.productService.getProductByCategory(this.idlsp)
      .subscribe(
        data => {
          this.products = data;
        }
      )
  }

  getAllCat() :void{
    this.categoryService.getAll()
    .subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      });
  }

  loadPage(page:number) {
    this.productService.search(page, this.pageSize, '').subscribe(
        data => {
        this.products = data.data;
        this.totalItems = data.totalItems;
        });
  }

}