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
    departureDate: '',
    returnDate: '',
    locationFrom: '',
    locationTo: '',
    passengers: 1,
  }

  @Output() formSubmit = new EventEmitter<any>();

  locations = ['Paris', 'Rome', 'Berlin', 'New York'];

  onSubmit() {
    this.formSubmit.emit(this.searchData);
  }

  getDateRange(date: Date, range: number) {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - range);

    const endDate = new Date(date);
    endDate.setDate(date.getDate() + range);

    return {
      startDate: formatDate(startDate, 'yyyy-MM-dd', 'en'),
      endDate: formatDate(endDate, 'yyyy-MM-dd', 'en')
    };
  }




}
