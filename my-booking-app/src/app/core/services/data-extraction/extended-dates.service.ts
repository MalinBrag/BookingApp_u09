import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtendedDatesService {

  calculateDateRange(date: string, expandDates: boolean): { startDate: string, endDate: string } | { date: string } {
    if (expandDates) {
      const dateObj = new Date(date);
      const beforeDate = new Date(dateObj);
      const afterDate = new Date(dateObj);

      beforeDate.setDate(dateObj.getDate() - 2);
      afterDate.setDate(dateObj.getDate() + 2);

      return {
        startDate: beforeDate.toISOString().split('T')[0],
        endDate: afterDate.toISOString().split('T')[0]
      };
    } else {
      return { date: date };  
    }
  }
  
}
