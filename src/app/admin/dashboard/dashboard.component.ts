import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import {MenuItem} from 'primeng/api';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DashboardComponent implements OnInit {

  productDialog?: boolean;
  products !: Product[];
  product: Product = new Product;
  selectedProducts !: Product[];
  submitted?: boolean;
  statuses !: any[];

  categories?: Category[];

  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllProduct();
    this.statuses = [
      {label: 'INSTOCK', value: 'Còn hàng'},
      {label: 'OUTOFSTOCK', value: 'Hết hàng'}
  ];

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
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete ' + product.name + '?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //   }
    // });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    // if (this.product.name.trim()) {
      if (this.product.id) {
        // this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        // this.product.id = this.createId();
        this.product.avatarImage = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    // }

  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  // createId(): string {
  //     let id = '';
  //     var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     for ( var i = 0; i < 5; i++ ) {
  //         id += chars.charAt(Math.floor(Math.random() * chars.length));
  //     }
  //     return id;
  // }
}