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
    this.checkAdminStatus();
  }

  registerUser(data: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/user/register`, data).pipe(
      tap((response: LoginResponse) => this.handleLoginResponse(response))
    );
  }

  signInUser(data: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/user/sign-in`, data).pipe(
      tap((response: LoginResponse) => this.handleLoginResponse(response))
    );
  }

  private handleLoginResponse(response: LoginResponse): void {
    const token = response.token;
    const userId = response.userId;
    const role = response.role;

    this.setToken(token);
    if (userId)
    {
      this.setUserId(userId);
    }

    if (role === 'Admin') {
      this.isAdminSubject.next(true);
      this.setRole(role);
    } else {
      this.isAdminSubject.next(false);
      this.setRole(role);
    }
  }

  logoutUser(): void {
    this.http.post(`${this.api}/user/logout`, {}).pipe(
      tap((response: any) => {
        localStorage.removeItem('token');
        this.isLoggedInSubject.next(false);
        localStorage.clear();
      })
    ).subscribe();
  }

  getProfile(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.api}/user/profile`).pipe(
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

  checkAdminStatus(): void {
    const role = this.getRole();
    if (role === 'Admin') {
      this.isAdminSubject.next(true);
    }
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      this.isLoggedInSubject.next(true);
    }
  }

  setRole(role: string): void {
    if (this.isBrowser) {
      localStorage.setItem('role', role);
    }
  }

  getRole(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('role');
    }
    return null;
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
