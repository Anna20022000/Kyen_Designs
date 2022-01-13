import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base-component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends BaseComponent implements OnInit {

  public user: any;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() { 
    // get USer
    this._user.user.subscribe((us) => {
      this.user = us;
    })
   }
   
   /**
   * Logout when click button Logout
   * Author: ChuYen (23/11/2021)
   */
  logout() {
    this._user.logout();
  }

}
