import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserAuthenticationService } from "../services/api/user-authentication.service";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(
        private userAuth: UserAuthenticationService,
        private router: Router,
    ) { }

    canActivate(): Observable<boolean> {
        return this.userAuth.isLoggedIn$.pipe(
            map((profile: any) => {
                const isAdmin = profile.user?.role === 'admin';
                if (!isAdmin) {
                    console.log('You are not an admin');
                }
                return isAdmin;
            }),
            tap((isAdmin) => {
                if (!isAdmin) {
                    this.router.navigate(['/']);
                }
            })
        );
    }
}



