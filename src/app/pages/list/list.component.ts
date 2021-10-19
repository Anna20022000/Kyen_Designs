import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
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
export class ListComponent extends BaseComponent implements OnInit, AfterViewInit {

  idlsp: number = 0;
  products?: Product[];
  categories?: Category[];

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
      this.getAllProduct();
    }
    else this.getProductsByCat();
  }

  ngAfterViewInit() {
    this.loadScripts();
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
}