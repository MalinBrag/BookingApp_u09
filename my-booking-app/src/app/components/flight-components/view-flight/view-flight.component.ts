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
  host: {ngSkipHydration: 'true'}
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
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { flight: FlightOfferResponse };
    if (state && state.flight) {
      this.flight = this.extractData.flightOfferData([state.flight])[0];
    } else {
      const mockFlight = this.extractData.generateMockFlight();
      this.flight = this.extractData.flightOfferData([mockFlight])[0];
    }
    this.initializeTable();
  }

  initializeTable(): void {
    if (this.flight.departureAirport) {
      this.departureAirport = this.airportService.getAirportByCode(this.flight.departureAirport);
    }
    if (this.flight.arrivalAirport) {
      this.arrivalAirport = this.airportService.getAirportByCode(this.flight.arrivalAirport);
    }
    this.airlineName = this.airlineService.getAirlineByCode(this.flight.flightNumber.split(' ')[0]);
    
    
  }

  onBookFlight(): void {}





}
