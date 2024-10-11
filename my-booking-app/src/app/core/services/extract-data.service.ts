import { Injectable } from '@angular/core';
import { Flight, FlightOfferResponse } from '../../shared/interfaces/flight.model';

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
      departureAirport: flight.itineraries[0].segments[0].departure.iataCode,
      arrivalAirport: flight.itineraries[0].segments[0].arrival.iataCode,
      duration: this.formatDuration(flight.itineraries[0].segments[0].duration),
      priceTotal: this.trimPrice(flight.price.grandTotal),
      priceCurrency: flight.price.currency,
      availableSeats: flight.numberOfBookableSeats
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

  getSelectedFlightsByIndex(departureIndex: number, rawResponse: FlightOfferResponse[]) {
    const selectedFlights: FlightOfferResponse[] = [];
    
    if (departureIndex !== null) {
        selectedFlights.push(rawResponse[departureIndex]);
    }

    return selectedFlights;
  }




}
