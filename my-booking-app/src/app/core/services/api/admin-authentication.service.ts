import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.model';
import { UserAuthenticationService } from './user-authentication.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationService {
  private api = environment.api;

  constructor(
    private http: HttpClient,
    private userAuth: UserAuthenticationService,
  ) { }

  isAdmin(): boolean {
    const role = this.userAuth.getRole();
    this.userAuth.checkAdminStatus();
    if (role !== 'Admin') {
      return false;
    } else {
      return true;
    }
  }

  getAllUsers(): Observable<User[]> {
    const token = this.userAuth.getToken();
    if (this.isAdmin()) {
      return this.http.get<User[]>(`${this.api}/admin/users`, {}).pipe(
        tap(users => console.log(users)),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
    } else {
      throw new Error('Unauthorized: Only admins can perform this action.');
    }
  }

  updateUser(userId: string, updatedData: Partial<User>): Observable<any> {
    const token = this.userAuth.getToken();
    
    if (this.isAdmin()) {
      return this.http.put<any>(`${this.api}/admin/users/${userId}`, updatedData, {}).pipe(
        tap(response => console.log(response)),
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );
    } else {
      throw new Error('Unauthorized: Only admins can perform this action.');
    } 
  }

  deleteUser(userId: string): Observable<any> {
    const token = this.userAuth.getToken();
    
    if (this.isAdmin()) {
      return this.http.delete(`${this.api}/admin/users/${userId}`).pipe(
        tap(response => console.log('User deleted successfully', response)),
        catchError(error => {
          console.error('Failed to delete user', error);
          return of(null);
        })
      );
    } else {
      throw new Error('Unauthorized: Only admins can perform this action.');
    }
  }




}



