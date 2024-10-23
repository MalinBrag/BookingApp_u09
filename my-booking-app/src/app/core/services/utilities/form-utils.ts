import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormUtils {
  private modeSubject = new BehaviorSubject<string>('register');
  mode$ = this.modeSubject.asObservable();

  /**
   * Sets the mode (title) of a form
   * @param mode 
   */
  setMode(mode: string): void {
    this.modeSubject.next(mode);
  }

  /**
   * Gets the mode (title) of a form
   * @returns string
   */
  getMode(): string {
    return this.modeSubject.value;
  }

  constructor() { }
}
