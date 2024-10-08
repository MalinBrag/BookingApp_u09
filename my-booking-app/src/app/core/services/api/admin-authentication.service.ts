import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../../shared/interfaces/login-response.model';
import { User } from '../../../shared/interfaces/user.model';
import { UserAuthenticationService } from './user-authentication.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationService {
  private api = environment.api;

  constructor(
    private http: HttpClient,
    private userAuth: UserAuthenticationService,
  ) { }

  async getAllUsers(): Promise<Observable<User[]>> {
    const token = this.userAuth.getToken();
    const isAdmin = await firstValueFrom(this.userAuth.isAdmin$);

    if (isAdmin) {
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

  async updateUser(userId: string, updatedData: Partial<User>): Promise<Observable<any>> {
    const token = this.userAuth.getToken();
    const isAdmin = await firstValueFrom(this.userAuth.isAdmin$);

    if (isAdmin) {
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

  async deleteUser(userId: string): Promise<Observable<any>> {
    const token = this.userAuth.getToken();
    const isAdmin = await firstValueFrom(this.userAuth.isAdmin$);

    if (isAdmin) {
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



