import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
import { BookedFlight } from '../../../shared/interfaces/flight.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookings: BookedFlight[] = [];
  
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
        console.log(response);
      },
      error: (error: any) => {
        console.error('Error loading bookings', error);
      }
    });
    
  }



}
