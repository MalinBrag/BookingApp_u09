import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { UserAuthenticationService } from "../services/api/user-authentication.service";

/**
 * Adds authorization header to the request if the user is authenticated as logged in
 */
export const userAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const userAuth: UserAuthenticationService = inject(UserAuthenticationService);
    const token = userAuth.getToken();

    if (token && navigator.onLine) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloned);
    } else {
        return next(req);
    }
};



