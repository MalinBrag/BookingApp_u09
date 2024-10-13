import { Component, OnInit } from '@angular/core';
import { Flight, FlightOfferResponse } from '../../../shared/interfaces/flight.model';
import { ExtractDataService } from '../../../core/services/extract-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AirportService } from '../../../core/services/airport.service';
import { AirlineService } from '../../../core/services/airline.service';
import { BreakpointService } from '../../../core/services/breakpoint.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-flight',
  standalone: true,
  imports: [
    CommonModule,
    NgIf
  ],
  templateUrl: './view-flight.component.html',
  styleUrl: './view-flight.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class ViewFlightComponent implements OnInit {
  title = 'Flight Details';
  isMobile: boolean = false;
  flight!: Flight;
  departureAirport!: { city: string, airport: string };
  arrivalAirport!: { city: string, airport: string };
  airlineName!: string;
  departureTime!: Date;
  arrivalTime!: Date;

  constructor(
    private extractData: ExtractDataService,
    private route: ActivatedRoute,
    private router: Router,
    private airportService: AirportService,
    private airlineService: AirlineService,
    private breakpoint: BreakpointService
  ) {}

  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
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

  onConfirmBooking(): void {}





}
