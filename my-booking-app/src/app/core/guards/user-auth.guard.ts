import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthenticationService } from '../services/api/user-authentication.service';
import { map, tap } from 'rxjs/operators';

export const userAuthGuard: CanActivateFn = (route, state) => {
    const userAuth: UserAuthenticationService = inject(UserAuthenticationService);
    const router: Router = inject(Router);

    return userAuth.isLoggedIn$.pipe(
        tap(isLoggedIn => {
            if (!isLoggedIn) {
                router.navigate(['/sign-in']);
            }
        }),
        map(isLoggedIn => isLoggedIn)
    );
};


