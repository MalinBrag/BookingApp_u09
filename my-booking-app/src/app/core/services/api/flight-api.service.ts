import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { QueryBuilderService } from '../query-builder.service';
import { ExtractDataService } from '../extract-data.service';
import { Flight, FlightOfferResponse } from '../../../shared/interfaces/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private apiUrl = `${environment.api}/flights`;
  
  constructor(
    private http: HttpClient,
    private queryBuilder: QueryBuilderService,
    private extractData: ExtractDataService
  ) { }

  getFlights(searchData: any): Observable<{ rawResponse: any[], extractedData: { departureFlights: Flight[] } }> {
    const queryString = this.queryBuilder.queryBuilder(searchData);
    return this.http.get<any[]>(`${this.apiUrl}/results`, {
      params: new HttpParams({ fromString: queryString })
    }).pipe(
      map((response: any[]) => ({
        rawResponse: response,
        extractedData: {  departureFlights: this.extractData.flightOfferData(response)}
      }))
    );
  }

  confirmOffer(selectedOffer: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-offer`, selectedOffer);
  }

}
