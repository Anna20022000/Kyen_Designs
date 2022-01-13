import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base-component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {
  items:any[] =[];
  total:any;

  orderForm !: FormGroup;
  cthds : any[] = [];
  user !: User;

  loading = false;
  submitted = false;
  returnUrl : string = "";
  error : string = "";

  
  constructor(injector: Injector, private router: Router,
    private formBuilder: FormBuilder,)
    { 
    super(injector);
  }

  ngOnInit(): void {    
    // get user logged
    this.user = this._user.userValue;

    // Get items in cart
    this._cart.items.subscribe((res) => {
      this.items = res;
      this.total = 0;

      for (let index = 0; index < this.items.length; index++) {
        const x = this.items[index];

        x.money = x.quantity * x.product.price;
        // set a detail order
        let cthd = {
          price : x.money,
          product : x.product,
          product_Id : x.product.id,
          quantity : x.quantity,
        };
        this.cthds[index] = cthd;
        this.total += x.money;
        
      }
    });

    // declare order form
    this.orderForm = this.formBuilder.group({
      user_Id: this.user.id,
      user: this.user,
      address : [this._user.userValue.address, Validators.required],
      phone: [this._user.userValue.phone, Validators.required],
      price: this.total,
      details: [this.cthds],
      addressDefauld: [''],
    });

  }
  // convenience getter for easy access to form fields
  get f() {
    return this.orderForm.controls;
  } 

  public onSubmit(){
    // set status form is submit
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }

    this.loading = true;

    // call API login in AuthenService
    console.log(this.orderForm.value);
    this._cart.pay(this.orderForm.value);

    this.router.navigate(['/home']);
  }
}
