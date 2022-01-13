import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const baseUrl = environment.apiUrl + '/api/cart';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getBillsOfUser(page:number, size:number, user:number) : Observable<any>{
    var obj:any = {page: page, pageSize: size, userId: user };
    return this.http.post(baseUrl + '/all-bill-user', obj);
  }
}
