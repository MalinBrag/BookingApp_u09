import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { AdminAuthenticationService } from "../services/api/admin-authentication.service";

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const adminAuth: AdminAuthenticationService = inject(AdminAuthenticationService);
    const token = adminAuth.getToken();

    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloned);
    } else {
        return next(req);
    }
};



