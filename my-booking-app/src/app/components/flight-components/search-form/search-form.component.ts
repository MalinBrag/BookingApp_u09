import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule ,NgFor, NgIf } from '@angular/common';
import { FlightOfferRequest } from '../../../shared/models/flight-offer.model';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {
  searchForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<FlightOfferRequest>();
  locations = ['Paris', 'Rome', 'Berlin', 'New York', 'London', 'Frankfurt', 'Amsterdam', 'Tokyo', 'Dubai'];
  private storageKey = 'flightSearchFormData';

  constructor(
    private fb: FormBuilder,
  ) { }

/**
 * Load of page
 */
  ngOnInit(): void {
    this.initializeForm();
    this.loadFormData();
  }

  /**
   * Initialize form with relevant fields
   */
  initializeForm() {
    this.searchForm = this.fb.group({
      tripType: ['one-way'],
      departureFlight: this.fb.group({
        departureDate: ['', Validators.required],
        locationFrom: ['', Validators.required],
        locationTo: ['', Validators.required],
        passengers: ['1', Validators.required],
      }),
    });
  }

  loadFormData() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.searchForm.patchValue(JSON.parse(storedData));
    }
  }

  /**
   * Submit form and pass the form value to parent component
   */
  onSubmit() {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      this.formSubmit.emit(formData);
      localStorage.setItem(this.storageKey, JSON.stringify(formData));
    } else {
      console.warn('Form is invalid');
    }
  }

}
