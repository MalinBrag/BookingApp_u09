import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthenticationService } from '../services/api/user-authentication.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({   
    providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
    constructor(
        private userAuth: UserAuthenticationService,
        private router: Router,
    ) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.userAuth.isLoggedIn$.pipe(
            map(isLoggedIn => {
                if (!isLoggedIn) {
                    this.router.navigate(['/sign-in']);
                }
                return isLoggedIn;
            }),
            tap(isLoggedIn => {
                if (!isLoggedIn) {
                    console.log('You are not logged in');
                }
            })
        );
    }
}



