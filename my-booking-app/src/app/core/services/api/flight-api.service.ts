import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private mockDataUrl = 'assets/mockdata.json';

  constructor(
    private http: HttpClient
  ) { }

  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(this.mockDataUrl);
  }
}
