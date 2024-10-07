import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../../shared/interfaces/login-response.model';
import { User } from '../../../shared/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private api = environment.api;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.isBrowser = typeof window !== 'undefined';
    this.checkLoginStatus();
  }

  registerUser(data: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/users/register`, data).pipe(
      tap((response: LoginResponse) => {
        const token = response.token;
        const userId = response.userId;
        const role = response.role;

        this.setToken(token);
        if (userId)
        {
          this.setUserId(userId);
        }

        if (role === 'admin') {
          this.isAdminSubject.next(true);
        } else {
          this.isAdminSubject.next(false);
        }
      })
    );
  }

  signInUser(data: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/users/sign-in`, data).pipe(
      tap((response: LoginResponse) => {
        const token = response.token;
        const userId = response.userId;
        const role = response.role;
console.log(response);
        this.setToken(token);
        if (userId)
        {
          this.setUserId(userId);
        }

        if (role === 'admin') {
          this.isAdminSubject.next(true);
        } else {
          this.isAdminSubject.next(false);
        }
      })
    );
  }

  logoutUser(): void {
    this.http.post(`${this.api}/users/logout`, {}).pipe(
      tap((response: any) => {
        localStorage.removeItem('token');
        this.isLoggedInSubject.next(false);
        localStorage.clear();
      })
    ).subscribe();
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.api}/users/profile`).pipe(
      tap((response: any) => {
        console.log(response);
      })
    );
  }

  checkLoginStatus(): void {
    const token = this.getToken();
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      this.isLoggedInSubject.next(true);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    console.log(localStorage.getItem)
    return localStorage.getItem('userId');
  }
  









}
