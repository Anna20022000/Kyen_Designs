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
  getProductsByCat(idlsp: number): void {
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

  updateMode(cat: Category) {
    this.isAddMode = false;
    this.category = cat;
    this.form = this.formBuilder.group({
      id: [this.category.id, Validators.required],
      name: [this.category.name, Validators.required],
    });
    $('#myModal').closest('.modal').modal('show');
  }
  createMode() {
    this.Reset();
    this.isAddMode = true;
  }
  onDelete(idlsp: any) {
    let id = Number.parseInt(idlsp);
    if (confirm("Bạn muốn xóa danh mục sản phẩm này?")) {
      this.getProductsByCat(id);
      if (this.products !== undefined) {
        alert("Danh mục này có chứa sản phẩm. Không thể xóa!")
      }
      else {
        if (this.categoryService.delete(id)
          .pipe(first())
          .subscribe(() => this.categories = this.categories.filter(x => x.id !== id))) alert('Xóa thành công!');
      }
    }
  }
  onCreate(): void {
    this.category.name = this.form.value.name;
    this.categoryService.create(this.category)
      .pipe(first())
      .subscribe(() => {
        alert('Thêm danh mục sản phẩm thành công!');
      })
  }
  onUpdate(): void {
    this.categoryService.update(this.form.value)
      .pipe(first())
      .subscribe(() => {
        alert('Cập nhật danh mục sản phẩm thành công!');
      })
  }

  Reset(): void {
    this.submitted = false;
    this.category = {};
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    });
  }
  closeModal() {
    $('#myModal').closest('.modal').modal('hide');
    this.Reset();
  }

}