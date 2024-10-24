import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
import { BookedFlight } from '../../../shared/models/displayed-flights.model';
import { Passenger } from '../../../shared/models/passenger.class';
import { FetchBookings } from '../../../shared/models/booking.model';

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

  /**
   * Load of page
   */
  ngOnInit(): void {
    this.loadMyBookings();
  }

  /**
   * Load all bookings of the user
   */
  loadMyBookings(): void {
    this.apiService.getBookings().subscribe({
      next: (response: FetchBookings[]) => {
        this.bookings = this.extractData.bookedFlightData(response);
        this.showDetails = new Array(this.bookings.length).fill(false);
      },
      error: (error) => {
        console.error('Error loading bookings', error);
      }
    });
  }

  /**
   * Function to expand the details of a booking
   * @param index 
   */
  toggleDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

}
