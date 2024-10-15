import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.model';
import { LocalStorageUtils } from '../utilities/local-storage-utils';
import { ErrorHandlingUtils } from '../utilities/error-handling-utils';
import { map } from 'rxjs/operators';

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

  getUser(userId: string): Observable<User> {
    this.checkAdminStatus();
    return this.http.get<User>(`${this.api}/admin/users/${userId}`).pipe(
      map((user: any) => ({ ...user, id: user._id })),
      catchError(ErrorHandlingUtils.handleError<User>('getUser'))
    );
  }

  getAllUsers(): Observable<User[]> {
    this.checkAdminStatus();
    return this.http.get<User[]>(`${this.api}/admin/users/all`).pipe(
      map((users: any[]) => users.map(user => ({ ...user, id: user._id}))),
      catchError(ErrorHandlingUtils.handleError<User[]>('getAllUsers', []))
    );
  }

  updateUser(userId: string, updatedData: Partial<User>): Observable<any> {
    this.checkAdminStatus();
    return this.http.put<any>(`${this.api}/admin/edit/${userId}`, updatedData).pipe(
      tap(response => console.log(response)),
      catchError(ErrorHandlingUtils.handleError<any>('updateUser', null))
    );  
  }

  deleteUser(userId: string): Observable<any> {
    this.checkAdminStatus();
    return this.http.delete(`${this.api}/admin/delete/${userId}`).pipe(
      tap(response => console.log('User deleted successfully', response)),
      catchError(ErrorHandlingUtils.handleError<any>('deleteUser', null))
    );
  }

  getToken(): string | null {
    return LocalStorageUtils.getItem<string>('token');
  }
}



