import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { DecodedToken } from '../../../shared/models/token.model';

@Injectable({
    providedIn: 'root'
})
export class TokenExpirationService {
    private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;
    private tokenExpiredSubject = new BehaviorSubject<boolean>(false);

    tokenExpired$ = this.tokenExpiredSubject.asObservable();

    isTokenExpired(token: string): boolean {
        const decodedToken: DecodedToken = jwtDecode(token);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        return expirationDate < new Date();
    }
    
    setTokenExpirationTimer(token: string): void {
        const decodedToken: DecodedToken = jwtDecode(token); 
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        const expiresIn = expirationDate.getTime() - new Date().getTime();
    
        const alertBeforeExp = 5 * 60 * 1000;
        const alertTime = expiresIn - alertBeforeExp;

        console.log('Token expires in: ', expiresIn);
        console.log(decodedToken);

        if (alertTime > 0) {
            this.tokenExpirationTimer = setTimeout(() => {
                alert('Your session will expire in 5 minutes.');
               this.tokenExpiredSubject.next(true);
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
