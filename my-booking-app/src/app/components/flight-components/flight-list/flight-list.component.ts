import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../../landing-page/landing-page.component';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { FlightOffer } from '../../../shared/models/displayed-flights.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';
import { Router } from '@angular/router';
import { FlightOfferRequest, FlightOffers } from '../../../shared/models/flight-offer.model';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [
    CommonModule,
    LandingPageComponent,
    ReactiveFormsModule
  ],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss'
})
export class FlightListComponent implements OnInit, OnChanges {
  isLoggedIn: boolean = false;
  @Input() searchData!: FlightOfferRequest;
  
  departureFlights: FlightOffer[] = [];
  rawResponse: FlightOffers[] = [];

  flightSelectionForm!: FormGroup;

  constructor(
    private apiService: FlightApiService,
    private fb: FormBuilder,
    private userAuth: UserAuthenticationService,
    private router: Router
  ) { }

  /**
   * Load of page
   */
  ngOnInit(): void {
    this.initializeForm();
    this.loadFlights(this.searchData);

    /**
     * Check if user is logged in
     */
    this.userAuth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  /**
   * Load of flights when input data changes
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchData'] && changes['searchData'].currentValue) {
      this.loadFlights(this.searchData);
    }
  }

  /**
   * Initialize form
   */
  initializeForm(): void {
    this.flightSelectionForm = this.fb.group({
      departureFlightIndex: [null, Validators.required],
    });
  }

  /**
   * Load of flights
   * @param data 
   */
  loadFlights(data: FlightOfferRequest): void {
    this.apiService.getFlights(data).subscribe(
      (flights: { rawResponse: FlightOffers[], extractedData: { departureFlights: FlightOffer[] } }) => {
      this.departureFlights = flights.extractedData.departureFlights;
      this.rawResponse = flights.rawResponse; 
    });
  }

  /**
   * Only logged in users can proceed with selected flight
   * Sends selected flight to API to confirm pricing and availability
   * @returns confirmation of selected flight and what user info is needed to book
   */
  confirmSelection(): void {
    if (this.flightSelectionForm.invalid) {
      window.alert('Please select a flight to proceed');
      return;
    }

    const departureFlightIndex = this.flightSelectionForm.get('departureFlightIndex')?.value;
    const selectedRawFlight = this.getSelectedFlightByIndex(departureFlightIndex, this.rawResponse);
    
    if (!this.isLoggedIn) {  
      window.alert('Please log in to proceed');
    } else {
      this.apiService.confirmOffer(selectedRawFlight).subscribe({
        next: () => {
          console.log('Offer confirmed');
        },
        error: (error) => {
          console.error('Error confirming offer:', error) 
        }
      });
      this.onFlightSelect(selectedRawFlight);
    }
  }

  /**
   * If pricing and availability is confirmed, user is redirected to view flight page
   * @param selectedFlight 
   * @returns the flight to display
   */
  onFlightSelect(selectedFlight: FlightOffers[]): void {
    if (!selectedFlight) {
      return;
  }
  const flightData = JSON.stringify(selectedFlight);
    this.router.navigate(['/view-flight'], { queryParams: { flight: encodeURIComponent(flightData) } });
  }

  getSelectedFlightByIndex(departureIndex: number, rawResponse: FlightOffers[]) {
    const selectedFlight: FlightOffers[] = [];
    
    if (departureIndex !== null) {
        selectedFlight.push(rawResponse[departureIndex]);
    }

    return selectedFlight;
  }

}
