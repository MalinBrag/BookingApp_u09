import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../../landing-page/landing-page.component';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { FlightOffer } from '../../../shared/models/displayed-flights.model';
// ta bort denna --- import { ExtendedDatesService } from '../../core/services/extended-dates.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
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
 //returnFlights: Flight[] = [];
  rawResponse: any;

  flightSelectionForm!: FormGroup;

  constructor(
    private apiService: FlightApiService,
    private fb: FormBuilder,
    private extractData:  ExtractDataService,
    private userAuth: UserAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadFlights(this.searchData);

    this.userAuth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchData'] && changes['searchData'].currentValue) {
      this.loadFlights(this.searchData);
    }
  }

  initializeForm(): void {
    this.flightSelectionForm = this.fb.group({
      departureFlightIndex: [null, Validators.required],
    });
  }

  loadFlights(data: FlightOfferRequest): void {
    this.apiService.getFlights(data).subscribe(
      (flights: { rawResponse: any[], extractedData: { departureFlights: FlightOffer[] } }) => {
      this.departureFlights = flights.extractedData.departureFlights;
      this.rawResponse = flights.rawResponse;
    });
    
  }

  confirmSelection(): void {
    if (this.flightSelectionForm.invalid) {
      window.alert('Please select a flight to proceed');
      return;
    }

    const departureFlightIndex = this.flightSelectionForm.get('departureFlightIndex')?.value;
    const selectedRawFlight = this.extractData.getSelectedFlightByIndex(departureFlightIndex, this.rawResponse);
    
    if (!this.isLoggedIn) {  //kan jag redirecta tillbaks hit efter inlogg/register?
      window.alert('Please log in to proceed');
    } else {
      this.apiService.confirmOffer(selectedRawFlight).subscribe({
        next: (response: any) => {
          console.log('Offer confirmed');
        },
        error: (error) => {
          console.error('Error confirming offer:', error) 
        }
      });
      this.onFlightSelect(selectedRawFlight);
    }
  }

  onFlightSelect(selectedFlight: FlightOffers[]): void {
    if (!selectedFlight) {
      return;
  }
  const flightData = JSON.stringify(selectedFlight);
    this.router.navigate(['/view-flight'], { queryParams: { flight: encodeURIComponent(flightData) } });
  }

}
