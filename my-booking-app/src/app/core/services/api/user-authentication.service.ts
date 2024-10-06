import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../../shared/interfaces/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private api = environment.api;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.checkLoginStatus();
  }

  registerUser(data: any): Observable<LoginResponse> {
    console.log(data);
    return this.http.post<LoginResponse>(`${this.api}/users/register`, data).pipe(
      tap((response: LoginResponse) => {
        const token = response.token;
        const userId = response.user.id;

        this.setToken(token);
        if (userId)
        {
          this.setUserId(userId);
        }
      })
    );
  }

  signInUser(data: any): Observable<LoginResponse> {
    console.log(data);
    return this.http.post<LoginResponse>(`${this.api}/users/sign-in`, data).pipe(
      tap((response: LoginResponse) => {
        const token = response.token;
        const userId = response.user.id;

        this.setToken(token);
        if (userId)
        {
          this.setUserId(userId);
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

  checkLoginStatus(): void {
    const token = this.getToken();
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  setUserId(id: string): void {
    localStorage.setItem('userId', id);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  









}
