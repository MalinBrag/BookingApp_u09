import { Injectable } from '@angular/core';
import { Flight, FlightOfferResponse } from '../../../shared/interfaces/flight.model';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataService {

  constructor() { }

  flightOfferData(response: FlightOfferResponse[]): Flight[] {
    return response.map((flight: FlightOfferResponse) => ({
      flightNumber: `${flight.itineraries[0].segments[0].carrierCode} ${flight.itineraries[0].segments[0].number}`,
      departureTime: flight.itineraries[0].segments[0].departure.at,
      arrivalTime: flight.itineraries[0].segments[0].arrival.at,
      departureDate: flight.itineraries[0].segments[0].departure.at.split('T')[0],
      arrivalDate: flight.itineraries[0].segments[0].arrival.at.split('T')[0],
      departureAirport: flight.itineraries[0].segments[0].departure.iataCode, 
      arrivalAirport: flight.itineraries[0].segments[0].arrival.iataCode, 
      departureTerminal: flight.itineraries[0].segments[0].departure.terminal,
      arrivalTerminal: flight.itineraries[0].segments[0].arrival.terminal, 
      duration: this.formatDuration(flight.itineraries[0].segments[0].duration),
      priceTotal: this.trimPrice(flight.price.grandTotal),
      priceBase: this.trimPrice(flight.price.base),
      priceForBag: this.trimPrice(flight.price.additionalServices[1]),
      class: flight.travelerPricings[0].fareDetailsBySegment[0].brandedFareLabel,
      priceCurrency: flight.price.currency.toLowerCase(),
      availableSeats: flight.numberOfBookableSeats,
      numberOfPassengers: flight.travelerPricings[0].travelerId.length,
      passengers: `${flight.travelerPricings[0].travelerId} ${flight.travelerPricings[0].travelerType.toLowerCase()}`,
      

    }));
  }

  formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) {
      return '';
    }
    const hours = match[1] ? match[1].replace('H', 'h ') : '';
    const minutes = match[2] ? match[2].replace('M', 'm') : '';

    return `${hours}${minutes}`.trim();
  }

  trimPrice(price: string): string {
    const parsedPrice = parseFloat(price);
    if (Number.isInteger(parsedPrice)) {
      return parsedPrice.toString();
    } else {
      return parsedPrice.toFixed(2).replace('.', ',');
    }
  }

  getSelectedFlightByIndex(departureIndex: number, rawResponse: FlightOfferResponse[]) {
    const selectedFlight: FlightOfferResponse[] = [];
    
    if (departureIndex !== null) {
        selectedFlight.push(rawResponse[departureIndex]);
    }

    return selectedFlight;
  }

}