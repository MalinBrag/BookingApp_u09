import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { FlightApiService } from '../../core/services/api/flight-api.service';
import { DepartureFlight } from '../../shared/interfaces/departure-flight.model';
import { ReturnFlight } from '../../shared/interfaces/return-flight.model';
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
  
  departureFlights: DepartureFlight[] = [];
  returnFlights: ReturnFlight[] = [];  

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
      //this.loadFlights();
    }
  }

  loadFlights(data: any): void {
    this.apiService.getFlights(data).subscribe((data: any) => {
      this.departureFlights = data as DepartureFlight[];
    }
    );

    /*this.loadDepartureFlights();
    if (this.searchData.tripType === 'round-trip' && this.searchData.returnFlight.returnDate) {
      this.loadReturnFlights();
    }*/
  }

  loadDepartureFlights(): void {
    this.apiService.getFlights(this.searchData.departureFlight).subscribe((data: any) => {
      this.departureFlights = data as DepartureFlight[];
    });
  }

  loadReturnFlights(): void {
    this.apiService.getFlights(this.searchData.returnFlight).subscribe((data: any) => {
      this.returnFlights = data as ReturnFlight[];
    });
  }
  
  

}
