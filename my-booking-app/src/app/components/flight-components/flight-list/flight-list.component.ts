import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../../landing-page/landing-page.component';
import { FlightApiService } from '../../../core/services/api/flight-api.service';
import { Flight, FlightOfferResponse, FlightSearchData } from '../../../shared/interfaces/flight.model';
// ta bort denna --- import { ExtendedDatesService } from '../../core/services/extended-dates.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ExtractDataService } from '../../../core/services/data-extraction/extract-data.service';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';
import { Router } from '@angular/router';

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
  isLoggedin: boolean = false;
  @Input() searchData!: FlightSearchData;
  
  departureFlights: Flight[] = [];
  returnFlights: Flight[] = [];
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
      this.isLoggedin = isLoggedIn;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchData'] && changes['searchData'].currentValue) {
      this.loadFlights(this.searchData);
    }
  }

  initializeForm(): void {
    this.flightSelectionForm = this.fb.group({
      departureFlightIndex: [null]
    });
  }

  loadFlights(data: FlightSearchData): void {
    this.apiService.getFlights(data).subscribe(
      (flights: { rawResponse: any[], extractedData: { departureFlights: Flight[] } }) => {
      this.departureFlights = flights.extractedData.departureFlights;
      this.rawResponse = flights.rawResponse;
    });
    
  }

  confirmSelection(): void {
    const departureFlightIndex = this.flightSelectionForm.get('departureFlightIndex')?.value;
    const selectedRawFlight = this.extractData.getSelectedFlightByIndex(departureFlightIndex, this.rawResponse);
    
    this.apiService.confirmOffer(selectedRawFlight).subscribe({
      next: (response: any) => {
        console.log('Offer confirmed');
        this.onFlightSelect(selectedRawFlight);
      },
      error: (error) => {
        console.error('Error confirming offer:', error) 
      }
    });
    this.onFlightSelect(selectedRawFlight);
  }

  onFlightSelect(selectedFlight: FlightOfferResponse[]): void {
    if (!selectedFlight) {
      return;
  }
  const flightData = JSON.stringify(selectedFlight);
    this.router.navigate(['/view-flight'], { queryParams: { flight: encodeURIComponent(flightData) } });
  }

}
