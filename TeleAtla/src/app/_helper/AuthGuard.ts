import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'src/app/service/Auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = sessionStorage.getItem("email");
        if (user) {
            return true;
        }
        this.router.navigate(['/mainsupporter'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    
    canActivateSup(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = sessionStorage.getItem("email");
        if (user) {
            return true;
        }
        this.router.navigate(['/mainsup'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}