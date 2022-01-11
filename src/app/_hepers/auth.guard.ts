import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        
        // if user already logged
        if (user) {
            return true;
        } 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const user = this.authenticationService.userValue;
        debugger
        // nếu có role truyền vào từ route và role đó ko chứa role của user đang login
        if (route.data.roles && (route.data.roles != user.roleUser_Id)) {
            // this.router.navigate(['/login']);
            this.router.navigate(['/unauthorized']);
            return false; 
        }
        return true;
    }
}
