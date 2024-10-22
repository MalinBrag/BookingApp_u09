import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { OfferQueryService } from '../query-builders/flightOffer-queryBuilder.service';
import { ExtractDataService } from '../data-extraction/extract-data.service';
import { passengerObjectService } from '../query-builders/passenger-object.service';
import { FlightOffer } from '../../../shared/models/displayed-flights.model';
import { LocalStorageUtils } from '../utilities/local-storage-utils';
import { ConfirmOfferResponse, FlightOfferRequest, FlightOffers } from '../../../shared/models/flight-offer.model';
import { BookingResponse, FetchBookings } from '../../../shared/models/booking.model';
import { RequiredUserData, User } from '../../../shared/models/user.model';
import { ErrorHandlingUtils } from '../utilities/error-handling-utils';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private apiUrl = `${environment.api}/flights`;
  
  constructor(
    private http: HttpClient,
    private offerQuery: OfferQueryService,
    private extractData: ExtractDataService,
    private passengerService: passengerObjectService,
  ) { }

  getFlights(searchData: FlightOfferRequest): Observable<{ rawResponse: FlightOffers[], extractedData: { departureFlights: FlightOffer[] } }> {
    const queryString = this.offerQuery.queryBuilder(searchData);
    return this.http.get<FlightOffers[]>(`${this.apiUrl}/results`, {
      params: new HttpParams({ fromString: queryString })
    }).pipe(
      map((response: FlightOffers[]) => ({
        rawResponse: response,
        extractedData: {  departureFlights: this.extractData.flightOfferData(response)}
      })),
      catchError(ErrorHandlingUtils.handleError<{ rawResponse: FlightOffers[], extractedData: { departureFlights: FlightOffer[] } }>('getFlights'))
    );
  }

  confirmOffer(selectedOffer: FlightOffers[]): Observable<ConfirmOfferResponse> {
    return this.http.post<ConfirmOfferResponse>(`${this.apiUrl}/confirm-offer`, selectedOffer).pipe(
      catchError(ErrorHandlingUtils.handleError<ConfirmOfferResponse>('confirmOffer'))
    )
  }

  createBooking(bookingData: FlightOffers, userData: User): Observable<BookingResponse> {
    const userId = userData.id;
    console.log(userData);
    const numberOfPassengers = bookingData.travelerPricings.length;
    const requiredUserData: RequiredUserData = {
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
    };

    const travelers = this.passengerService.createPassengers(requiredUserData, numberOfPassengers);
    
    if (this.userValidation(userData) === false) {
      window.alert('User validation failed, please log in again');
      throw new Error('User validation failed, please log in again');
    } else {
      const result = this.http.post<BookingResponse>(`${this.apiUrl}/create-booking`, { 
        userId: userId,
        bookingData: bookingData,
        travelers: travelers, 
      }).pipe(
        catchError(ErrorHandlingUtils.handleError<BookingResponse>('createBooking'))
      );
      return result;
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

  getBookings(): Observable<FetchBookings[]> {
    const userId = LocalStorageUtils.getItem('userId');
    return this.http.get<FetchBookings[]>(`${this.apiUrl}/bookings/${userId}`).pipe(
      catchError(ErrorHandlingUtils.handleError<FetchBookings[]>('getBookings', []))
    );
  }

}
