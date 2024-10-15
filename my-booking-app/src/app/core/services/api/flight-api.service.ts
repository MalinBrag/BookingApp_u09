import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { QueryBuilderOfferService } from '../query-builders/querybuilder-flightoffer.service';
import { ExtractDataService } from '../data-extraction/extract-data.service';
import { QueryBuilderCreateService } from '../query-builders/querybuilder-createbooking.service';
import { Flight } from '../../../shared/interfaces/flight.model';
import { LocalStorageUtils } from '../utilities/local-storage-utils';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private apiUrl = `${environment.api}/flights`;
  
  constructor(
    private http: HttpClient,
    private queryBuilderOffer: QueryBuilderOfferService,
    private extractData: ExtractDataService,
    private queryBuilderCreate: QueryBuilderCreateService,
  ) { }

  getFlights(searchData: any): Observable<{ rawResponse: any[], extractedData: { departureFlights: Flight[] } }> {
    const queryString = this.queryBuilderOffer.queryBuilder(searchData);
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
    const userId = userData.id;
    const numberOfPassengers = bookingData.travelerPricings.length;
    const travelers = this.queryBuilderCreate.queryBuilderUser(userData, numberOfPassengers);
    
    if (this.userValidation(userData) === false) {
      window.alert('User validation failed, please log in again');
      throw new Error('User validation failed, please log in again');
    } else {
      return this.http.post(`${this.apiUrl}/create-booking`, { 
        userId: userId,
        bookingData: bookingData,
        travelers: travelers, 
      }).pipe(
        map((response: any) => ({
          response: response,
        }))
      );
    }
  }

  userValidation(userData: any): boolean {
    const storedUserId = LocalStorageUtils.getItem('userId');
    const userId = userData.id;

    console.log('Stored user ID:', storedUserId);
    console.log('User ID:', userId);
    
    if (storedUserId === userId) {
      return true;
    } else {
      return false;
    }
  }

}
