import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base-component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent extends BaseComponent implements OnInit {
  user: User = {};
  bills: any;
  userForm!: FormGroup;
  submitted = false;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // get USer
    this._user.user.subscribe((us) => {
      this.user = us;
    });

    this.userForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      address: [this.user.address, Validators.required],
      dateOfBirth: [this.formatDate(this.user.dateOfBirth)],
      phone: [this.user.phone, Validators.required],
      email: [this.user.email, Validators.required],
    });

    this.getBillOfUser();
    // set status form is submit
    // this.submitted = true;

    // stop here if form is invalid
    // if (this.userForm.invalid) {
    //   return;
    // }

    // call API login in AuthenService
    // this.authenticationService
    //   .login(this.f.uid.value, this.f.pwd.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       // if login success, return a url
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     (error) => {
    //       this.error = error;
    //     }
    //   );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  /**
   * when submit form, update user
   * author: ChuYen (6/12/2021)
   */
  updateUser() {}

  getBillOfUser() {
    if (this.user.id != undefined) {
      this.userService
        .getBillsOfUser(1, 4, this.user.id)
        .pipe(first())
        .subscribe(
          (res) => {
            this.bills = res.data;
          },
          (error) => {
            alert(error);
          }
        );
    }
  }
  /**
   * Logout when click button Logout
   * Author: ChuYen (23/11/2021)
   */
  logout() {
    this._user.logout();
  }
  /**
   * Format datetime
   * @param dateTime ngay thang
   * @returns datetype
   */
  formatDate(dateTime: any) {
    var date = new Date(dateTime);
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + '-' + month + '-' + day;
  }
}
