import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { QueryBuilderOfferService } from '../query-builders/querybuilder-flightoffer.service';
import { ExtractDataService } from '../data-extraction/extract-data.service';
import { Flight } from '../../../shared/interfaces/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private apiUrl = `${environment.api}/flights`;
  
  constructor(
    private http: HttpClient,
    private queryBuilder: QueryBuilderOfferService,
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

  createBooking(bookingData: any, userData: any): Observable<any> {
    console.log('Booking data:', bookingData);
    console.log('User data:', userData);
    const result = this.http.post(`${this.apiUrl}/create-booking`, { bookingData, userData });
console.log('Result:', result);
    return result;
  }

}
