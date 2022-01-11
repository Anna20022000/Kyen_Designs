import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";  
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
  
const baseUrl = environment.apiUrl + '/api/manager';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDTThang(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+ '/get_doanh_thu_thang');
  }
}
