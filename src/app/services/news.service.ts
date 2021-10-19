import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news';
import { environment } from 'src/environments/environment';

const baseURL = environment.apiUrl + "/api/news/new";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getLatest() : Observable<News[]>{
    return this.http.get<News[]>(baseURL);
  }
}
