import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component'; 
import { CommonModule, NgIf } from '@angular/common';
import { FlightListComponent } from '../flight-list/flight-list.component';

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
  recievedFormData: any = {};

  handleFormSubmit(event: any) {
    this.recievedFormData = { ...event };
  }

  isFormDataEmpty(): boolean {
    return Object.keys(this.recievedFormData).length === 0;
    
  }






}
