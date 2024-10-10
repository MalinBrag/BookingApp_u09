import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { QueryBuilder } from '../query-builder';
import { ExtractDataService } from '../extract-data.service';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private apiUrl = `${environment.api}/flights`;
  
  constructor(
    private http: HttpClient,
    private queryBuilder: QueryBuilder,
    private extractData: ExtractDataService
  ) { }

  getFlights(searchData: any): Observable<any> {
    const queryString = this.queryBuilder.queryBuilder(searchData);

    const hasReturnFlight = !!searchData.returnFlight?.returnDate;

    return this.http.get(`${this.apiUrl}/results`, {
      params: new HttpParams({ fromString: queryString })
    }).pipe(
      map((response: any) => this.extractData.flightOfferData(response, hasReturnFlight))
    );
  }





}
