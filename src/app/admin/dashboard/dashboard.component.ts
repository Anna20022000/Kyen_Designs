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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../layouts/admin/admin.component.css'],
})
export class DashboardComponent extends BaseComponent implements OnInit {

  id !: number;
  products !: Product[];
  product: Product = new Product;
  submitted: boolean = false;
  categories?: Category[];

  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public formsearch: any;
  public isAddMode: any;

  form!: FormGroup;
  file: any;

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
      color: new FormControl(),
      size: new FormControl(),
      // state: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl(),
      productCategory_Id: new FormControl(),
      avatarImage: new FormControl(),
    });
    // this.formsearch = this.formBuilder.group({
    //   'name': ['']
    // });
    this.getAllProduct();
    this.getAllCat();

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

  // CREATE OR EDIT

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if(this.file){ // nếu có chọn ảnh
      const formData = new FormData();
    formData.append('file', this.file);
    this.productService.upload(formData)
      .subscribe(res => {
        this.product = this.form.value;
        this.product.avatarImage = res.filePath;
        this.product.productCategory_Id = Number.parseInt(this.form.value.productCategory_Id);
        debugger;
        if (this.isAddMode) this.onCreate();
        if (!this.isAddMode) this.onUpdate();
        this.submitted = false;
        this.closeModal();
      })
    }
    else{ //nếu update ko sửa ảnh
      let img = this.product.avatarImage;
      this.product = this.form.value;
      this.product.avatarImage = img;
      this.product.productCategory_Id = Number.parseInt(this.form.value.productCategory_Id);
      if (!this.isAddMode) this.onUpdate();
        this.submitted = false;
        this.closeModal();
    }
  }

  updateMode(id: any) {
    this.isAddMode = false;
    setTimeout(() => {
      this.productService.getSingle(Number.parseInt(id))
        .subscribe(
          data => {
            this.product = data;
            debugger;
            this.form = this.formBuilder.group({
              id : [this.product.id, Validators.required],
              name: [this.product.name, Validators.required],
              color: [this.product.color, Validators.required],
              size: [this.product.size, Validators.required],
              // state: [this.product.state, Validators.required],
              description: [this.product.description, Validators.required],
              quantity: [this.product.quantity, Validators.required],
              price: [this.product.price, Validators.required],
              productCategory_Id:[ , Validators.required],
              avatarImage: [this.product.avatarImage, Validators.required],
            });
          },
          error => {
            console.log(error);
          });
    }, 500);
    $('#myModal').closest('.modal').modal('show');
  }
  createMode() {
    this.Reset();
    this.isAddMode = true;
  }
  onDelete(id: any) {
    let idsp = Number.parseInt(id);
    if (confirm("Bạn muốn xóa sản phẩm này?"))
      if (this.productService.delete(id)
        .pipe(first())
        .subscribe(() => this.products = this.products.filter(x => x.id !== id))) alert('Xoa thanh cong!');

  }
  onCreate(): void {
    this.product.productCategory_Id = Number.parseInt(this.form.value.productCategory_Id);
    this.product.state = true;
    this.productService.create(this.product)
      .pipe(first())
      .subscribe(() => {
        alert('Thêm sản phẩm thành công!');
      })
  }
  onUpdate(): void {
    this.productService.update(this.product)
      .pipe(first())
      .subscribe(() => {
        alert('Cập nhật sản phẩm thành công!');
      })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  Reset(): void {
    this.product = {};
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      productCategory_Id: ['', Validators.required],
      avatarImage: ['', Validators.required],
    });
  }
  closeModal() {
    $('#myModal').closest('.modal').modal('hide');
  }
}