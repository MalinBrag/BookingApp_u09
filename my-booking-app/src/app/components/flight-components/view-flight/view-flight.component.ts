import { Component, OnInit } from '@angular/core';
import { FlightOffer } from '../../../shared/models/displayed-flights.model';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { CommonModule, NgIf } from '@angular/common';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { BookingComponent } from "../booking/booking.component";
import { User } from '../../../shared/models/user.model';
import { FlightOffers } from '../../../shared/models/flight-offer.model';
import { BookingResponse } from '../../../shared/models/booking.model';

@Component({
  selector: 'app-view-flight',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    BookingComponent
],
  templateUrl: './view-flight.component.html',
  styleUrl: './view-flight.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class ViewFlightComponent implements OnInit {
  title = 'Flight Details';
  isMobile: boolean = false;
  isLoggedIn: boolean = false;

  flight!: FlightOffer;
  rawFlightData: FlightOffers[] = [];
  bookingSuccessful: boolean = false;
  userCredentials!: User;
  
  constructor(
    private extractData: ExtractDataService,
    private route: ActivatedRoute,
    private breakpoint: BreakpointService,
    private userAuth: UserAuthenticationService,
    private apiService: FlightApiService,
  ) {}

  /**
   * Load of page
   */
  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.userAuth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
  });

    this.extractAndLoadFlightData();
    this.getUserCredentials();
  }

  /**
   * Extract the data passed to this component to display it in a readable format
   */
  extractAndLoadFlightData(): void {
    this.route.queryParams.subscribe(params => {
      const flightData = params['flight'];

      if (flightData) {
        const flightRaw = JSON.parse(decodeURIComponent(flightData));
        this.rawFlightData = flightRaw;
        this.flight = this.extractData.flightOfferData(flightRaw)[0];
      } else {
        console.error('No flight data found');
      }
    });
  }

  /**
   * Book the selected flight
   * @returns a booking response
   */
  onConfirmBooking() {
    const selectedOffer = this.rawFlightData[0];
    return this.apiService.createBooking(selectedOffer, this.userCredentials).subscribe({
      next: (response: BookingResponse) => {
        if (response && response.id) {
          this.bookingSuccessful = true;
          window.alert('Booking successful!');
        } else {
          this.bookingSuccessful = false;
          window.alert('Booking failed. Please try again.');
        }
      }
    });
  }

  /**
   * Get the user credentials for the logged in user
   */
  getUserCredentials() {
    this.userAuth.getProfile().subscribe({
      next: (response) => {
        this.userCredentials = response;
      },
      error: (error) => {
        console.error('Error getting user credentials:', error);
      }
    });
  }
 

}
