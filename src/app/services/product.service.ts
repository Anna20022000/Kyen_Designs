import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';


const baseUrl = environment.apiUrl + '/api/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Product[]>{
    return this.http.get<Product[]>(baseUrl + '/all')
  }

  getProductByCategory(id:number) : Observable<Product[]>{
    return this.http.get<Product[]>(baseUrl+'/getProByCat/'+id);
  }

  getProductLatest() : Observable<Product[]>{
    return this.http.get<Product[]>(baseUrl + '/new');
  }

  getProductSalest() : Observable<Product[]>{
    return this.http.get<Product[]>(baseUrl + '/getTopSalingProducts');
  }
}
