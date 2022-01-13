import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base-component';
import { first } from 'rxjs/operators';

import { MessageService } from 'primeng/api';


declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../layouts/admin/admin.component.css'],
  providers: [MessageService]
})
export class ProductComponent extends BaseComponent implements OnInit {

  products !: Product[];
  product: Product = new Product;
  submitted: boolean = false;
  categories?: Category[];

  public page = 1;
  public pageSize = 10;
  public totalItems: any;

  public nameSearch: string = "";
  idFilterLSP: number = 0;
  public isAddMode: any;


  form!: FormGroup;
  file: any;
  avatar: any;

  constructor(
    injector: Injector,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,

    private messageService: MessageService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      color: new FormControl(),
      size: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl(),
      productCategory_Id: new FormControl(),
      avatarImage: new FormControl(),
    });

    this.getAllCat();
    this.loadPage(1);

  }

  /**
   * Thực hiện lấy tất cả các LSP
   */
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

  /**
   * Khi click button LƯU
   * @returns form nếu form không hợp lệ
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.file) { // nếu có chọn ảnh
      const formData = new FormData();
      formData.append('file', this.file);
      this.productService.upload(formData)
        .subscribe(res => {
          this.product = this.form.value;
          this.product.avatarImage = res.filePath;
          this.product.productCategory_Id = Number.parseInt(this.form.value.productCategory_Id);
          debugger;
          if (this.isAddMode) this.onCreate();
          else this.onUpdate();
          this.closeModal();
          this.loadPage(this.page);
        })
    }
    else { //nếu update ko sửa ảnh
      let img = this.product.avatarImage;
      this.product = this.form.value;
      this.product.avatarImage = img;
      this.product.productCategory_Id = Number.parseInt(this.form.value.productCategory_Id);
      if (!this.isAddMode) this.onUpdate();
      this.closeModal();
      this.loadPage(this.page);
    }
  }
  /**
   * Khi click button Sửa
   * Hiển thị form sửa
   * @param id khóa chính
   */
  updateMode(id: any) {
    this.isAddMode = false;
    setTimeout(() => {
      this.productService.getSingle(Number.parseInt(id))
        .pipe(first())
        .subscribe(
          data => {
            this.product = data;
            this.form = this.formBuilder.group({
              id: [this.product.id, Validators.required],
              name: [this.product.name, Validators.required],
              color: [this.product.color, Validators.required],
              size: [this.product.size, Validators.required],
              description: [this.product.description, Validators.required],
              quantity: [this.product.quantity, Validators.required],
              price: [this.product.price, Validators.required],
              productCategory_Id: [this.product.productCategory_Id, Validators.required],
              avatarImage: [this.product.avatarImage, Validators.required],
            });

          },
          error => {
            console.log(error);
          });
    }, 500);
    $('#myModal').closest('.modal').modal('show');
  }
  /**
   * Khi click btn Thêm mới
   */
  createMode() {
    this.Reset();
    this.isAddMode = true;
  }
  /**
   * Khi click button Xóa, thực hiện xóa bản ghi trong db
   * @param id khóa chính bảng sản phẩm
   */
  onDelete(id: any) {
    let idsp = Number.parseInt(id);
    if (confirm("Bạn muốn xóa sản phẩm này?"))
      if (this.productService.delete(id)
        .pipe(first())
        .subscribe(() => this.products = this.products.filter(x => x.id !== id)))
        this.messageService.add({ severity: 'success', summary: 'Xóa thành công', detail: 'Bạn đã xóa sản phẩm thành công!' });

  }
  /**
   * Thực hiện Thêm mới
   */
  onCreate(): void {
    this.product.productCategory_Id = Number.parseInt(this.form.value.productCategory_Id);
    this.product.state = true;
    this.productService.create(this.product)
      .pipe(first())
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Thêm thành công', detail: 'Bạn đã thêm sản phẩm thành công!' });
        this.loadPage(1);
      })
  }
  /**
   * Thực hiện Sửa
   */
  onUpdate(): void {
    this.productService.update(this.product)
      .pipe(first())
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Sản phẩm được cập nhật thành công!' });

        this.loadPage(1);
      })
  }
  /**
   * khi input chọn file ảnh có sự thay đổi
   * @param event sự kiện
   */
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      var reader = new FileReader();

      reader.readAsDataURL(file); // read file as data url

      reader.onload = (e:any) => { // called once readAsDataURL is completed
        this.avatar = e.target.result;
      }
    }
  }

  /**
   * reset form
   * Author: ChuYen (20/10/2021)
   */
  Reset(): void {
    this.submitted = false;
    this.avatar = null;
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

  /**
   * Đóng form modal
   */
  closeModal() {
    $('#myModal').closest('.modal').modal('hide');
    this.Reset();
  }
  /**
   * Tìm kiếm và phân trang
   * @param page số trang
   */
  loadPage(page: number) {
    this.productService.search(page, this.pageSize, this.nameSearch).subscribe(
      data => {
        this.products = data.data;
        this.totalItems = data.totalItems;
      });
  }

  /**
 * filter product when change category
 * Author: ChuYen (22/11/2021)
 */
  filterLSP() {
    if (this.idFilterLSP == 0) {
      this.loadPage(1);
    }
    else {
      this.productService.getProductByCategory(this.idFilterLSP)
        .subscribe(
          data => {
            this.products = data;
            this.totalItems = this.products.length;
          },
          error => {
            console.log(error);
          });
    }
  }
}