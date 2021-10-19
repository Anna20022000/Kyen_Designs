import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // public checkoutForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    // this.checkoutForm = new FormGroup({
    //   fname: new FormControl,
    //   lname: new FormControl,
    //   address: new FormControl
    // })

  }
  // public onSubmit(f:any){
  //   let x = f;
  //   debugger;
  // }
  public onSubmit(){

  }
}
