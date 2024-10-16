import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
import { BookedFlight } from '../../../shared/interfaces/flight.model';
import { PassengerData } from '../../../shared/interfaces/user.model';

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
  passengers: PassengerData[] = [];
  
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
        this.displayPassengers(response);
      },
      error: (error: any) => {
        console.error('Error loading bookings', error);
      }
    });
    
  }

  displayPassengers(passengerData: PassengerData[]) {
    console.log('Passenger data:', passengerData);
    const passengers = this.extractData.bookedPassengerData(passengerData);
    console.log('Passengers:', passengers);
  }



}
