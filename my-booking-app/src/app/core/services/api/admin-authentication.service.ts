import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.model';
import { LocalStorageUtils } from '../../../utils/local-storage-utils';
import { ErrorHandlingUtils } from '../../../utils/error-handling-utils';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationService {
  private api = environment.api;

  constructor(
    private http: HttpClient,
  ) { }

  checkAdminStatus(): void {
    const role = LocalStorageUtils.getItem<string>('role');
    if (role !== 'Admin') {
      throw new Error('Unauthorized access');
    }
  }

  getAllUsers(): Observable<User[]> {
    try {
      this.checkAdminStatus();
      return this.http.get<User[]>(`${this.api}/admin/users`).pipe(
        tap(users => console.log(users)),
        catchError(ErrorHandlingUtils.handleError<User[]>('getAllUsers', []))
      );
    } catch (error) {
      return ErrorHandlingUtils.handleError<User[]>('getAllUsers', [])(error);
    }
  }

  updateUser(userId: string, updatedData: Partial<User>): Observable<any> {
    try {
      this.checkAdminStatus();
      return this.http.put<any>(`${this.api}/admin/users/${userId}`, updatedData).pipe(
        tap(response => console.log(response)),
        catchError(ErrorHandlingUtils.handleError<any>('updateUser', null))
      );
    } catch (error) {
      return ErrorHandlingUtils.handleError<any>('updateUser', null)(error);
    }
  }

  deleteUser(userId: string): Observable<any> {
    try {
      this.checkAdminStatus();
      return this.http.delete(`${this.api}/admin/users/${userId}`).pipe(
        tap(response => console.log('User deleted successfully', response)),
        catchError(ErrorHandlingUtils.handleError<any>('deleteUser', null))
      );
    } catch (error) {
      return ErrorHandlingUtils.handleError<any>('deleteUser', null)(error);
    }
  }
}



