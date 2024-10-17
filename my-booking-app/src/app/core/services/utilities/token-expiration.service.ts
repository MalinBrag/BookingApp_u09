import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserAuthenticationService } from '../api/user-authentication.service';

@Injectable({
    providedIn: 'root'
})
export class TokenExpirationService {
    private tokenExpirationTimer: any;

    constructor(
        private userAuth: UserAuthenticationService
    ) { }

    isTokenExpired(token: string): boolean {
        const decodedToken: any = jwtDecode(token);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        return expirationDate < new Date();
    }
    
    setTokenExpirationTimer(token: string): void {
        const decodedToken: any = jwtDecode(token);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        const expiresIn = expirationDate.getTime() - new Date().getTime();
    
        const alertBeforeExp = 5 * 60 * 1000;
        const alertTime = expiresIn - alertBeforeExp;

        if (alertTime > 0) {
            this.tokenExpirationTimer = setTimeout(() => {
                alert('Your session will expire in 5 minutes.');
                this.userAuth.logoutUser();
            }, alertTime);
        }
    }

    clearTokenExpTimer(): void {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}

