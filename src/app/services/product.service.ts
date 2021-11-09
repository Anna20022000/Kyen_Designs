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
  getSingle(id:number): Observable<Product>{
    return this.http.get<Product>(baseUrl+'/getSingle/'+id);
  }

  search(page:number, size:number, name:string):Observable<any>{
    var obj:any = {page: page, pageSize: size, tenSP: name };
    return this.http.post(baseUrl + '/search', obj);
  }

  delete(id:number) :Observable<any>{
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  update(p:any):Observable<any>{
    return this.http.put(baseUrl + '/update_product', p);
  }

  create(p:any):Observable<any>{
    return this.http.post(baseUrl + '/create_product', p);
  }
  upload(file: FormData) : Observable<any>{
    return this.http.post(`${baseUrl}/upload`, file);
  }
}
