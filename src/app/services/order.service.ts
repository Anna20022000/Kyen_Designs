import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const baseUrl = environment.apiUrl + '/api/cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  constructor(private http: HttpClient) { }

  getDetails(idhd:number): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+ `/cthd-by-hd/${idhd}`);
  }

  getAll(page:number, size:number) : Observable<any>{
    var obj:any = {page: page, pageSize: size };
    return this.http.post(baseUrl + '/all', obj);
  }

  createAnOrder(order: any): Observable<any>{
    let od = JSON.stringify(order);
    return this.http.post(`${baseUrl}/create`, order, {responseType: 'text'});
  }
}
