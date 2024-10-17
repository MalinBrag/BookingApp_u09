import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor() { }

  searchData = {
    tripType: 'one-way',
    departureFlight: {
      departureDate: '',
      locationFrom: '',
      locationTo: '',
      passengers: '1',
    },
   /* returnFlight: {
      returnDate: '',
      locationFrom: '',
      locationTo: '',
      passengers: '1',
    }*/
  };

  @Output() formSubmit = new EventEmitter<any>();

  locations = ['Paris', 'Rome', 'Berlin', 'New York', 'London', 'Frankfurt', 'Amsterdam', 'Tokyo', 'Dubai'];

  onSubmit() {
    this.formSubmit.emit(this.searchData);
  }

}
