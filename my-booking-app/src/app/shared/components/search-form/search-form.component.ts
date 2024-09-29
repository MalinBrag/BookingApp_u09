import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormsModule } from '@angular/forms';
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

  locations = ['Paris', 'Rome', 'Berlin', 'New York'];

  onSubmit() {
    console.log(this.searchData);
    const departureDate = new Date(this.searchData.departureDate);
    const returnDate = this.searchData.returnDate ? new Date(this.searchData.returnDate) : null;
    //expand range
    const departureRange = this.getDateRange(departureDate, 2);
    const returnRange = returnDate ? this.getDateRange(returnDate, 2) : null;

    console.log("Expanded Departure Date Range:", departureRange);
    console.log("Expanded Return Date Range:", returnRange);


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
