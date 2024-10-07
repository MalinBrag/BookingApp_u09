import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { UserAuthenticationService } from "../services/api/user-authentication.service";

export const userAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const userAuth: UserAuthenticationService = inject(UserAuthenticationService);
    const token = userAuth.getToken();

    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloned);
    } else {
        return next(req);
    }
};



