import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base-component';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../../layouts/admin/admin.component.css'],
})
export class CategoryComponent extends BaseComponent implements OnInit {

  category: Category = new Category;
  submitted: boolean = false;
  categories!: Category[];

  products!: Product[];
  public isAddMode: any;

  form!: FormGroup;

  constructor(
    injector: Injector,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
    });

    this.getAllCat();
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
  getProductsByCat(idlsp: number) {
    this.productService.getProductByCategory(idlsp)
      .subscribe(
        data => {
          this.products = data;
        }
      )
  }

  // CREATE OR EDIT
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  // When click button SAVE
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else {
      if (this.isAddMode) this.onCreate();
      else this.onUpdate();
    }
    this.closeModal();
  }

  // Mode when click Update a category
  updateMode(cat: Category) {
    this.isAddMode = false;
    this.category = cat;
    this.form = this.formBuilder.group({
      id: [this.category.id, Validators.required],
      name: [this.category.name, Validators.required],
    });
    $('#myModal').closest('.modal').modal('show');
  }

  // Mode when click Add new a category
  createMode() {
    this.Reset();
    this.isAddMode = true;
  }

  /**
   * Function delete a category
   * @param idlsp 
   * Author: CTKYen (14/11/2021)
   */
  onDelete(idlsp: any) {
    let id = Number.parseInt(idlsp);
    
    this.getProductsByCat(id);
    
    if (confirm("Bạn muốn xóa danh mục sản phẩm này?")) {
      console.log(this.products);
      if (this.products.length > 0) {
        alert("Danh mục này có chứa sản phẩm. Không thể xóa!")
      }
      else {
        if (this.categoryService.delete(id)
          .pipe(first())
          .subscribe(() => this.categories = this.categories.filter(x => x.id !== id))) alert('Xóa thành công!');
      }
    }
  }

  /**
   * Function Create a new category
   */
  onCreate(): void {
    this.category.name = this.form.value.name;
    this.categoryService.create(this.category)
      .pipe(first())
      .subscribe(() => {
        alert('Thêm danh mục sản phẩm thành công!');
      })
  }

  /**
   * Function UPDATE a category
   */
  onUpdate(): void {
    this.categoryService.update(this.form.value)
      .pipe(first())
      .subscribe(() => {
        alert('Cập nhật danh mục sản phẩm thành công!');
      })
  }

  // Function reset form control
  Reset(): void {
    this.submitted = false;
    this.category = {};
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  // close Modal
  closeModal() {
    $('#myModal').closest('.modal').modal('hide');
    this.Reset();
  }

}