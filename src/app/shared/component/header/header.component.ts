import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base-component';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent extends BaseComponent implements OnInit {

  items:any;
  total:any;
  sum: number =0;
  categories?: Category[];

  constructor(injector: Injector, private categoryService: CategoryService) { 
    super(injector);
  }
  ngOnInit(): void {
    this.getAllCat();
    this._cart.items.subscribe((res) => {
      this.items = res;
      this.total = 0;
      this.sum = this.items.length;
      for(let x of this.items){ 
        x.money = x.quantity * x.product.price;
        this.total += x.money;
      } 
    });
  }

  getAllCat(): void {
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
