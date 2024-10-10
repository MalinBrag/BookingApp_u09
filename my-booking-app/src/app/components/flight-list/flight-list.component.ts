import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { FlightApiService } from '../../core/services/api/flight-api.service';
import { ReturnFlight } from '../../shared/interfaces/return-flight.model';
import { Flight } from '../../shared/interfaces/flight.model';
//import { ExtendedDatesService } from '../../core/services/extended-dates.service';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [
    CommonModule,
    LandingPageComponent,
  ],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss'
})
export class FlightListComponent implements OnInit, OnChanges {
  @Input() searchData!: { 
    tripType: string; 
    departureFlight: {
      departureDate: string; 
      locationFrom: string; 
      locationTo: string; 
      passengers: string;
    };
    returnFlight: {
      returnDate: string; 
      locationFrom: string; 
      locationTo: string; 
      passengers: string;
    };
  }
  
  departureFlights: Flight[] = [];
  returnFlights: Flight[] = [];  

  constructor(
    private apiService: FlightApiService,
  ) { }

  ngOnInit(): void {
    if (this.searchData) {
      this.loadFlights(this.searchData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchData'] && changes['searchData'].currentValue) {
      this.loadFlights(this.searchData);
    }
  }

  loadFlights(data: any): void {
    this.apiService.getFlights(data).subscribe((flights: any) => {
      console.log('extracted data', flights);
      this.departureFlights = flights.departureFlights as Flight[];
      this.returnFlights = flights.returnFlights as Flight[] || [];
    });
  }
  

}
