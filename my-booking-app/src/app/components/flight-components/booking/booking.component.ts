import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
import { BookedFlight } from '../../../shared/models/displayed-flights.model';
import { Passenger } from '../../../shared/models/passenger.class';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    NgIf
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookings: BookedFlight[] = [];
  passengers: Passenger[] = [];
  showDetails: boolean[] = [];
  
  constructor(
    private apiService: FlightApiService,
    private extractData: ExtractDataService,
  ) { }

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings() {
    this.apiService.getBookings().subscribe({
      next: (response: any) => {
        this.bookings = this.extractData.bookedFlightData(response);
        this.showDetails = new Array(this.bookings.length).fill(false);
      },
      error: (error: any) => {
        console.error('Error loading bookings', error);
      }
    });
  }

  toggleDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

}
