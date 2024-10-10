import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { QueryBuilder } from '../query-builder';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private apiUrl = `${environment.api}/flights`;
  
  constructor(
    private http: HttpClient,
    private queryBuilder: QueryBuilder,
  ) { }

  getFlights(searchData: any): Observable<any> {
    const queryString = this.queryBuilder.queryBuilder(searchData);
    console.log(queryString);

    return this.http.get(`${this.apiUrl}/results`, {
      params: new HttpParams({ fromString: queryString })
    });
  }
















  /*private mockDataUrl = 'assets/mockdata.json';

  constructor(
    private http: HttpClient
  ) { }

  getFlights(params: any): Observable<any[]> {
    return this.http.get<any[]>(this.mockDataUrl, {
      params: {
        date: params.date,
        from: params.from,
        to: params.to,
        passengers: params.passengers
      }
    });
  }*/
}
