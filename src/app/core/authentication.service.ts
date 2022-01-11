import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject !: BehaviorSubject<User>;
    public user !: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) 
    {
        // get userSubject in local storerage
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userKyen') as string));
        // set user = userSubject
        this.user = this.userSubject.asObservable();
    }

    /**
     * Get user value
     */
    public get userValue(): User {
        return this.userSubject.value;
    }

    /**
     * Login and save user logged in local storerage
     * @param username string
     * @param password string
     * @returns user logged
     */
    login(username: string, password: string) {
        let obj = {
            uid : username,
            pwd : password
        }
        // call api login
        return this.http.post<any>(`${environment.apiUrl}/api/login/login`, obj )
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('userKyen', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    /**
     * remove user from local storage to log user out
     * redirect to login page
     */
    logout() {
        this.remove();
        this.router.navigate(['/login']);
    }

    /**
     * remove user from local storage to log user out
     */
    remove() {
        localStorage.removeItem('userKyen');
        this.userSubject.next(null as any);
    }
    
}
