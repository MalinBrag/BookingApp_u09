import { Injectable } from '@angular/core';
import { FlightOffer, BookedFlight } from '../../../shared/models/displayed-flights.model';
import { AirportService } from '../lookup-data/airport.service';
import { Passenger } from '../../../shared/models/passenger.class';
import { FlightOffers } from '../../../shared/models/flight-offer.model';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataService {

  constructor(
    private airportService: AirportService,
  ) { }

  flightOfferData(response: FlightOffers[]): FlightOffer[] {
    return response.map((flight: FlightOffers) => {
      const segment = flight.itineraries[0].segments[0];

      return {
        flightNumber: `${segment.carrierCode} ${segment.number}`,
        departureDate: segment.departure.at.split('T')[0],
        departureDateTime: this.formatDateTime(segment.departure.at),
        arrivalDateTime: this.formatDateTime(segment.arrival.at),
        departureAirport: segment.departure.iataCode, 
        arrivalAirport: segment.arrival.iataCode, 
        duration: this.formatDuration(segment.duration),
        priceTotal: this.trimPrice(flight.price.grandTotal),
        class: flight.travelerPricings[0].fareDetailsBySegment[0].brandedFareLabel,
        priceCurrency: flight.price.currency.toLowerCase(),
        availableSeats: flight.numberOfBookableSeats,
        numberOfPassengers: flight.travelerPricings[0].travelerId.length,
        passengers: `${flight.travelerPricings[0].travelerId} ${flight.travelerPricings[0].travelerType.toLowerCase()}`,
      
      };
    });
  }

  bookedFlightData(response: any): BookedFlight[] {
    return response.map((booking: any) => {
      const flight = booking.bookingData.flightOffers[0];
      const segment = flight.itineraries[0].segments[0];

      return {
        createdOn: this.formatDateTime(booking.createdAt),
        bookingId: this.formatBookingId(booking.bookingData.id),
        flightNo: `${segment.carrierCode} ${segment.number}`,
        depCity: this.airportService.getCityAirportByCode(segment.departure.iataCode).city,
        depAirport: this.airportService.getCityAirportByCode(segment.departure.iataCode).airport,
        depTerminal: segment.departure.terminal,
        arrCity: this.airportService.getCityAirportByCode(segment.arrival.iataCode).city,
        arrAirport: this.airportService.getCityAirportByCode(segment.arrival.iataCode).airport,
        arrTerminal: segment.arrival.terminal,
        depDateTime: this.formatDateTime(segment.departure.at),
        duration: this.formatDuration(segment.duration),
        priceTotal: this.trimPrice(flight.price.grandTotal),
        passengersTotal: `${flight.travelerPricings.length} ${flight.travelerPricings[0].travelerType.toLowerCase()}`,
        passengers: booking.bookingData.travelers.map((passenger: Passenger) => ({
          id: passenger.id,
          name: passenger.name,
          dateOfBirth: passenger.dateOfBirth,
          documents: passenger.documents[0].documentType.toLowerCase(),
        })),
      }
    });
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

  formatDateTime(dateTime: string): string {
    const [date, time] = dateTime.split('T');
    const formattedDateTime = time.substring(0, 5);
    return `${date} ${formattedDateTime}`;
  }

  formatBookingId(bookingId: string): string {
    const decoded = decodeURIComponent(bookingId);
    return decoded.replace(/=/g, ' ');
  }

  trimPrice(price: string): string {
    const parsedPrice = parseFloat(price);
    if (Number.isInteger(parsedPrice)) {
      return parsedPrice.toString();
    } else {
      return parsedPrice.toFixed(2).replace('.', ',');
    }
  }



}
