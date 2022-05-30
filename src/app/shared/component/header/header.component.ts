import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base-component';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent extends BaseComponent implements OnInit {

  items: any;
  total: any;
  sum: number = 0;
  categories?: Category[];

  user: any;

  constructor(injector: Injector, private categoryService: CategoryService) {
    super(injector);
  }
  ngOnInit(): void {
    this.getAllCat();
    // get Cart
    this._cart.items.subscribe((res) => {
      this.items = res;
      this.total = 0;
      this.sum = 0;
      if (this.items && this.items != null) {
        this.sum = this.items.length;
        for (let x of this.items) {
          x.money = x.quantity * x.product.price;
          this.total += x.money;
        }
      }

    });
    // get USer
    this._user.user.subscribe((us) => {
      this.user = us;
    })
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

  /**
   * Logout when click button Logout
   * Author: ChuYen (23/11/2021)
   */
  logout() {
    this._user.logout();
  }
}
