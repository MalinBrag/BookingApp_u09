import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingUtils {
    constructor() { }

  /**
   * Errorhandling for http requests
   * @param operation 
   * @param result 
   * @returns an observable of the result
   */
  static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}