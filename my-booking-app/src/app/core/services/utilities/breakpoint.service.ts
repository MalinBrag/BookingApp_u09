import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to check if the screen is mobile
 */
export class BreakpointService {
  isMobile$: Observable<boolean>;

  constructor(private breakpoint: BreakpointObserver) {
    this.isMobile$ = this.breakpoint.observe('(max-width: 768px)')
      .pipe(map(result => result.matches));
   }
}
