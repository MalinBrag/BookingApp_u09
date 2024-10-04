import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  searchData = {
    tripType: 'one-way',
    departureFlight: {
      departureDate: '',
      locationFrom: '',
      locationTo: '',
      passengers: '1',
    },
    returnFlight: {
      returnDate: '',
      locationFrom: '',
      locationTo: '',
      passengers: '1',
    }
  };

  @Output() formSubmit = new EventEmitter<any>();

  locations = ['Paris', 'Rome', 'Berlin', 'New York'];

  onSubmit() {
    if (this.searchData.tripType === 'round-trip') {
      this.searchData.returnFlight.locationFrom = this.searchData.departureFlight.locationTo;
      this.searchData.returnFlight.locationTo = this.searchData.departureFlight.locationFrom;
      this.searchData.returnFlight.passengers = this.searchData.departureFlight.passengers;
    }
    this.formSubmit.emit(this.searchData);
  }




}
