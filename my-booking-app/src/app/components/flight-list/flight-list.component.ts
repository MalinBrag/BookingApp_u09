import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { FlightApiService } from '../../core/services/api/flight-api.service';

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
export class FlightListComponent implements OnInit {
  @Input() searchData!: { 
    tripType: string; 
    departureDate: string; 
    returnDate: string; 
    locationFrom: string; 
    locationTo: string; 
    passengers: number;
   }

  expandedDateRange = { startDate: '', endDate: '' };
  flights: any[] = [];

  constructor(
    private apiService: FlightApiService
  ) { }

  ngOnInit(): void {
    if (this.searchData && this.searchData.departureDate) {
      this.calculateDateRange(this.searchData.departureDate);
    }
    this.loadFlights();
  }

  calculateDateRange(date: string) {
    const dateObj = new Date(date);
    const beforeDate = new Date(dateObj);
    const afterDate = new Date(dateObj);

    beforeDate.setDate(dateObj.getDate() - 2);
    afterDate.setDate(dateObj.getDate() + 2);

    this.expandedDateRange.startDate = beforeDate.toISOString().split('T')[0];
    this.expandedDateRange.endDate = afterDate.toISOString().split('T')[0];
  }

  loadFlights() {
    console.log(this.searchData);
    this.apiService.getFlights().subscribe(data => {
      this.flights = data;
      //console.log(this.flights);
    });
  }



}
