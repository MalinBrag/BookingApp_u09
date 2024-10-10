import { Injectable } from '@angular/core';
import { Flight } from '../../shared/interfaces/flight.model';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataService {

  constructor() { }

  flightOfferData(response: any, hasReturnFlight: boolean): { departureFlights: Flight[], returnFlights?: Flight[] } {
    const departureFlights = response.map((flight: any) => ({
      flightNumber:  `${flight.itineraries[0].segments[0].carrierCode} ${flight.itineraries[0].segments[0].number}`,
      departureTime: flight.itineraries[0].segments[0].departure.at,
      arrivalTime: flight.itineraries[0].segments[0].arrival.at,
      departureAirport: flight.itineraries[0].segments[0].departure.iataCode,
      arrivalAirport: flight.itineraries[0].segments[0].arrival.iataCode,
      duration: flight.itineraries[0].segments[0].duration,
      priceTotal: flight.price.grandTotal,
      priceCurrency: flight.price.currency,
      availableSeats: flight.numberOfBookableSeats
    }));

    let returnFlights: Flight[] = [];

    if (hasReturnFlight) {
      returnFlights = response.map((flight: any) => {
        if (flight.itineraries.length > 1) {
          return {
            flightNumber: `${flight.itineraries[1].segments[0].carrierCode} ${flight.itineraries[1].segments[0].number}`,
            departureTime: flight.itineraries[1].segments[0].departure.at,
            arrivalTime: flight.itineraries[1].segments[0].arrival.at,
            departureAirport: flight.itineraries[1].segments[0].departure.iataCode,
            arrivalAirport: flight.itineraries[1].segments[0].arrival.iataCode,
            duration: flight.itineraries[1].segments[0].duration,
            priceTotal: flight.price.grandTotal,
            priceCurrency: flight.price.currency,
            availableSeats: flight.numberOfBookableSeats
          };
        }
        return null;
      }).filter((flight: any) => flight !== null);
    }

    return {
      departureFlights,
      ...(hasReturnFlight && returnFlights.length > 0 ? { returnFlights } : {})
    };
  }



















}
