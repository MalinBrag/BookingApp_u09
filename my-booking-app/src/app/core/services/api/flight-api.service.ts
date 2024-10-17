import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { QueryBuilderOfferService } from '../query-builders/querybuilder-flightoffer.service';
import { ExtractDataService } from '../data-extraction/extract-data.service';
import { QueryBuilderCreateService } from '../query-builders/querybuilder-createbooking.service';
import { BookedFlight, FlightOffer } from '../../../shared/models/displayed-flights.model';
import { LocalStorageUtils } from '../utilities/local-storage-utils';
import { ConfirmOfferResponse, FlightOfferRequest, FlightOffers } from '../../../shared/models/flight-offer.model';
import { BookingResponse } from '../../../shared/models/booking.model';
import { User } from '../../../shared/models/user.model';

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

  getFlights(searchData: FlightOfferRequest): Observable<{ rawResponse: any[], extractedData: { departureFlights: FlightOffer[] } }> {
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

  confirmOffer(selectedOffer: FlightOffers[]): Observable<ConfirmOfferResponse> {
    return this.http.post<ConfirmOfferResponse>(`${this.apiUrl}/confirm-offer`, selectedOffer);
  }

  createBooking(bookingData: FlightOffers, userData: User): Observable<BookingResponse> {
    const userId = userData.id;
    const numberOfPassengers = bookingData.travelerPricings.length;
    const travelers = this.queryBuilderCreate.queryBuilderUser(userData, numberOfPassengers);
    
    if (this.userValidation(userData) === false) {
      window.alert('User validation failed, please log in again');
      throw new Error('User validation failed, please log in again');
    } else {
      return this.http.post<BookingResponse>(`${this.apiUrl}/create-booking`, { 
        userId: userId,
        bookingData: bookingData,
        travelers: travelers, 
      }); //jag hade map här
    }
  }

  userValidation(userData: User): boolean {
    const storedUserId = LocalStorageUtils.getItem('userId');
    const userId = userData.id;

    if (storedUserId === userId) {
      return true;
    } else {
      return false;
    }
  }

  getBookings(): Observable<BookedFlight> {
    const userId = LocalStorageUtils.getItem('userId');
    return this.http.get<BookedFlight>(`${this.apiUrl}/bookings/${userId}`);
  }

}
