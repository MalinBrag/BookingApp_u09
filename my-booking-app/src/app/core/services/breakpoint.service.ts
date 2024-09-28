import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  isMobile$: Observable<boolean>;

  constructor(
    private breakpoint: BreakpointObserver
  ) {
    this.isMobile$ = this.breakpoint.observe('(max-width: 768px)')
      .pipe(
        map(result => result.matches)
      );
   }
}
