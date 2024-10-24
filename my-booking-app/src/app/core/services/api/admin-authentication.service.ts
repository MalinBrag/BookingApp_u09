import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user.model';
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

  /**
   * Checks the localstorage set token if the user is an admin
   */
  checkAdminStatus(): void {
    const role = LocalStorageUtils.getItem<string>('role');
    if (role !== 'Admin') {
      throw new Error('Unauthorized access');
    }
  }

  /**
   * Checks admin status and sends a request to the server to get a user by id
   * @param userId 
   * @returns Observable of a user
   */
  getUser(userId: string): Observable<User> {
    this.checkAdminStatus();
    return this.http.get<User>(`${this.api}/admin/users/${userId}`).pipe(
      map((user: User) => ({ ...user, id: user._id })),
      catchError(ErrorHandlingUtils.handleError<User>('getUser'))
    );
  }

  /**
   * Checks admin status and sends a request to the server to get all users
   * @returns Observable of all users
   */
  getAllUsers(): Observable<User[]> {
    this.checkAdminStatus();
    return this.http.get<User[]>(`${this.api}/admin/users/all`).pipe(
      map((users: User[]) => users.map(user => ({ ...user, id: user._id}))),
      catchError(ErrorHandlingUtils.handleError<User[]>('getAllUsers', []))
    );
  }

  /**
   * Checks admin status and sends a request to the server to update a user
   * @param userId 
   * @param updatedData 
   * @returns Observable of a user
   */
  updateUser(userId: string, updatedData: Partial<User>): Observable<User> {
    this.checkAdminStatus();
    return this.http.put<User>(`${this.api}/admin/edit/${userId}`, updatedData).pipe(
      tap(response => console.log(response)),
      catchError(ErrorHandlingUtils.handleError<User>('updateUser', undefined))
    );  
  }

  /**
   * Checks admin status and sends a request to the server to delete a user
   * @param userId 
   * @returns a string message 
   */
  deleteUser(userId: string): Observable<string> {
    this.checkAdminStatus();
    return this.http.delete<string>(`${this.api}/admin/delete/${userId}`).pipe(
      tap(response => console.log('User deleted successfully', response)),
      catchError(ErrorHandlingUtils.handleError<string>('deleteUser', undefined))
    );
  }

  /**
   * Fetches the token set in localstorage
   * @returns the token from local storage
   */
  getToken(): string | null {
    return LocalStorageUtils.getItem<string>('token');
  }
}



