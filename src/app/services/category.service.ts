import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";  
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';
  
const baseUrl = environment.apiUrl + '/api/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl+ '/all');
  }
  delete(id:number) :Observable<any>{
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  update(p:any):Observable<any>{
    return this.http.put(baseUrl + '/update', p);
  }

  create(p:any):Observable<any>{
    debugger
    return this.http.post(baseUrl + '/create', p);
  }
}