import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, RegisterUser, LoginUser, LoginResponse } from '../../../shared/models/user.model';
import { LocalStorageUtils } from '../utilities/local-storage-utils';
import { ErrorHandlingUtils } from '../utilities/error-handling-utils';
import { TokenExpirationService } from '../utilities/token-expiration.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private api = environment.api;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenExpirationService
  ) { 
    this.checkLoginStatus();
    this.checkAdminStatus();
    this.tokenService.tokenExpired$.subscribe(expired => {
      if (expired) {
        this.logoutUser();
      }
    });
  }

  isAdmin(): boolean {
    return this.isAdminSubject.getValue();
  }

  registerUser(user: RegisterUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/user/register`, user).pipe(
      tap((response: LoginResponse) => {
        if (!this.isAdmin()) {
          this.handleLoginResponse(response);
        }
      }),
      catchError(ErrorHandlingUtils.handleError<LoginResponse>('registerUser'))
    );
  }

  signInUser(user: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/user/sign-in`, user).pipe(
      tap((response: LoginResponse) => this.handleLoginResponse(response)),
      catchError(ErrorHandlingUtils.handleError<LoginResponse>('signInUser'))
    );
  }

  private handleLoginResponse(response: LoginResponse): void {
    const { token, userId, role } = response; 

    LocalStorageUtils.setItem('token', token);
    LocalStorageUtils.setItem('userId', userId);
    LocalStorageUtils.setItem('role', role);

    this.isLoggedInSubject.next(true);
    if (role === 'Admin') {
      this.isAdminSubject.next(true);
    }

    this.tokenService.setTokenExpirationTimer(token);
  }

  logoutUser(): void {
    this.http.post(`${this.api}/user/logout`, {}).pipe(
      tap(() => {
        LocalStorageUtils.removeItem('token');
        LocalStorageUtils.removeItem('userId');
        LocalStorageUtils.removeItem('role');

        this.isLoggedInSubject.next(false);
        localStorage.clear();
      }),
      catchError(ErrorHandlingUtils.handleError<void>('logoutUser'))
    ).subscribe();
  }

  getProfile(): Observable<User> {
    const token = LocalStorageUtils.getItem<string>('token');
    return this.http.get(`${this.api}/user/profile`).pipe(
      tap((response: any) => {
        if (response) {
          return response;
        }
      }),
      catchError(ErrorHandlingUtils.handleError<any>('getProfile'))
    );
  }

  checkLoginStatus(): void {
    const token = LocalStorageUtils.getItem<string>('token');
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  checkAdminStatus(): void {
    const role = LocalStorageUtils.getItem<string>('role');
    if (role === 'Admin') {
      this.isAdminSubject.next(true);
    }
  }

  getRole(): string | null {
    return LocalStorageUtils.getItem<string>('role');
  }

  getToken(): string | null {
    return LocalStorageUtils.getItem<string>('token');
  }

  getUserId(): string | null {
    return LocalStorageUtils.getItem<string>('userId');
  }

}
