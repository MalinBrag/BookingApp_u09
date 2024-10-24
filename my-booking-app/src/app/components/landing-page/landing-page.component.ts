import { Component } from '@angular/core';
import { SearchFormComponent } from '../flight-components/search-form/search-form.component'; 
import { CommonModule, NgIf } from '@angular/common';
import { FlightListComponent } from '../flight-components/flight-list/flight-list.component';
import { FlightOfferRequest } from '../../shared/models/flight-offer.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SearchFormComponent,
    FlightListComponent,
    CommonModule,
    NgIf
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  subtitle = 'Welcome to My Booking App';
  recievedFormData: FlightOfferRequest | null = null;

  /**
   * Handle form submission from search form component
   * @param event - The form data emitted from the search form component
   */
  handleFormSubmit(event: FlightOfferRequest) {
    this.recievedFormData = { ...event };
  }

  /**
   * Check if the form data is empty
   * @returns boolean
   */
  isFormDataEmpty(): boolean {
    return this.recievedFormData === null;
  }

}
