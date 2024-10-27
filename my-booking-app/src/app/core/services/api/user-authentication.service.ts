import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, RegisterUser, LoginUser, LoginResponse } from '../../../shared/models/user.model';
import { LocalStorageUtils } from '../utilities/local-storage-utils';
import { ErrorHandlingUtils } from '../utilities/error-handling-utils';
import { TokenExpirationService } from './token-expiration.service';

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

  /**
   * Checks if the user role is an admin or not
   * @returns boolean
   */
  isAdmin(): boolean {
    return this.isAdminSubject.getValue();
  }

  /**
   * Function to register a new user
   * @param user 
   * @returns LoginResponse
   */
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

  /**
   * Function to sign in a user
   * @param user 
   * @returns LoginResponse
   */
  signInUser(user: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/user/sign-in`, user).pipe(
      tap((response: LoginResponse) => this.handleLoginResponse(response)),
      catchError(ErrorHandlingUtils.handleError<LoginResponse>('signInUser'))
    );
  }

  /**
   * Stores the login response in local storage and sets the token expiration timer
   * @param response 
   */
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

  /**
   * Logs out the user by sending a request to the server and clearing local storage
   */
  logoutUser(): void {
    this.http.post(`${this.api}/user/logout`, {}).pipe(
      tap(() => {
        //LocalStorageUtils.removeItem('token');
        //LocalStorageUtils.removeItem('userId');
        //LocalStorageUtils.removeItem('role');

        this.isLoggedInSubject.next(false);
        //localStorage.clear();
      }),
      catchError(ErrorHandlingUtils.handleError<void>('logoutUser'))
    ).subscribe();
  }

  /**
   * Gets the user profile
   * @returns Observable of a user
   */
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.api}/user/profile`).pipe(
      tap((response) => {
        return response || {};
      }),
      catchError(ErrorHandlingUtils.handleError<User>('getProfile'))
    );
  }

  /**
   * Checks the localstorage set token if the user is logged in
   */
  checkLoginStatus(): void {
    const token = LocalStorageUtils.getItem<string>('token');
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  /**
   * Checks the localstorage set token if the user is an admin
   */
  checkAdminStatus(): void {
    const role = LocalStorageUtils.getItem<string>('role');
    if (role === 'Admin') {
      this.isAdminSubject.next(true);
    }
  }

  /**
   * Gets the user role
   * @returns the user role from local storage
   */
  getRole(): string | null {
    return LocalStorageUtils.getItem<string>('role');
  }

  /**
   * Gets the token
   * @returns the token from local storage
   */
  getToken(): string | null {
    return LocalStorageUtils.getItem<string>('token');
  }

  /**
   * Gets the user id
   * @returns the user id from local storage
   */
  getUserId(): string | null {
    return LocalStorageUtils.getItem<string>('userId');
  }

}
