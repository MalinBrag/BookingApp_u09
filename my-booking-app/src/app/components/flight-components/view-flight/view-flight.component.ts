import { Component, OnInit } from '@angular/core';
import { Flight, FlightOfferResponse } from '../../../shared/interfaces/flight.model';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AirportService } from '../../../core/services/lookup-data/airport.service';
import { AirlineService } from '../../../core/services/lookup-data/airline.service';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { CommonModule, NgIf } from '@angular/common';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { BookingComponent } from "../booking/booking.component";
import { Observable } from 'rxjs';

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
  flight!: Flight;
  departureAirport!: { city: string, airport: string };
  arrivalAirport!: { city: string, airport: string };
  airlineName!: string;
  departureTime!: Date;
  arrivalTime!: Date;
  bookingSuccessful: boolean = false;
  userCredentials: any;

  constructor(
    private extractData: ExtractDataService,
    private route: ActivatedRoute,
    private router: Router,
    private airportService: AirportService,
    private airlineService: AirlineService,
    private breakpoint: BreakpointService,
    private userAuth: UserAuthenticationService,
    private apiService: FlightApiService,
  ) {}

  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.userAuth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
  });
    this.route.queryParams.subscribe(params => {
      const flightData = params['flight'];
      if (flightData) {
        const flight = JSON.parse(decodeURIComponent(flightData));
        this.flight = this.extractData.flightOfferData(flight)[0];
      } else {
        console.error('No flight data found');
      }
      });
      this.initializeTable();
      this.getUserCredentials();
  }

  initializeTable(): void {  
    if (!this.flight || !this.flight.flightNumber) {
      console.error('flight or flightnumber is missing');
    }
    if (this.flight.departureAirport) {
      try {
        this.departureAirport = this.airportService.getAirportByCode(this.flight.departureAirport);
      } catch (error) {
        console.error('Error getting departure airport:', error);
      }
      
    }
    if (this.flight.arrivalAirport) {
       try {
        this.arrivalAirport = this.airportService.getAirportByCode(this.flight.arrivalAirport);
       } catch (error) {
        console.error('Error getting arrival airport:', error);
       }  
    }
    try {
     this.airlineName = this.airlineService.getAirlineByCode(this.flight.flightNumber.split(' ')[0]);
    } catch (error) {
      console.error('Error getting airline name:', error);
    }
  }

  onConfirmBooking() {
    return this.apiService.createBooking(this.flight, this.userCredentials).subscribe({
      next: (response) => {
        this.bookingSuccessful = true;
        console.log('response', response);
      }
    });
  }

  getUserCredentials() {
    if (!this.isLoggedIn) {  //kan jag redirecta tillbaks hit efter inlogg/register?
      window.alert('Please log in to proceed');
    }

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
