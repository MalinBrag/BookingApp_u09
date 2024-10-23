import { Injectable } from '@angular/core';
import { FlightOffer, BookedFlight } from '../../../shared/models/displayed-flights.model';
import { AirportService } from '../lookup-data/airport.service';
import { Passenger } from '../../../shared/models/passenger.class';
import { FlightOffers } from '../../../shared/models/flight-offer.model';
import { AirlineService } from '../lookup-data/airline.service';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataService {

  constructor(
    private airportService: AirportService,
    private airlineService: AirlineService,
  ) { }

  /**
   * Formats the response data from the API to be more user-friendly
   * @param response 
   * @returns FlightOffers to be displayed
   */
  flightOfferData(response: FlightOffers[]): FlightOffer[] {
    return response.map((flight: FlightOffers) => {
      const segment = flight.itineraries[0].segments[0];

      return {
        flightNumber: `${segment.carrierCode} ${segment.number}`,
        airlineName: this.airlineService.getAirlineByCode(segment.carrierCode),
        departureDate: segment.departure.at.split('T')[0],
        departureDateTime: this.formatDateTime(segment.departure.at),
        arrivalDateTime: this.formatDateTime(segment.arrival.at),
        departureCity: this.airportService.getCityAirportByCode(segment.departure.iataCode).city, 
        departureAirport: this.airportService.getCityAirportByCode(segment.departure.iataCode).airport,
        departureAirportCode: segment.departure.iataCode,
        arrivalCity: this.airportService.getCityAirportByCode(segment.arrival.iataCode).city,
        arrivalAirport: this.airportService.getCityAirportByCode(segment.arrival.iataCode).airport,
        arrivalAirportCode: segment.arrival.iataCode, 
        duration: this.formatDuration(segment.duration),
        priceTotal: this.trimPrice(flight.price.grandTotal),
        class: flight.travelerPricings[0].fareDetailsBySegment[0].brandedFareLabel.toLowerCase(),
        priceCurrency: flight.price.currency,
        availableSeats: flight.numberOfBookableSeats,
        numberOfPassengers: flight.travelerPricings.length,
      };
    });
  }

  /**
   * Formats the response data from the API to be more user-friendly
   * @param response 
   * @returns BookedFlight to be displayed
   */
  bookedFlightData(response: any): BookedFlight[] {
    return response.map((booking: any) => {
      const flight = booking.bookingData.flightOffers[0];
      const segment = flight.itineraries[0].segments[0];

      return {
        createdOn: this.formatDateTime(booking.createdAt),
        bookingId: this.formatBookingId(booking.bookingData.id),
        flightNo: `${segment.carrierCode} ${segment.number}`,
        airlineName: this.airlineService.getAirlineByCode(segment.carrierCode),
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

  /**
   * Formats the duration of the flight to be more user-friendly
   * @param duration 
   * @returns string
   */
  formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) {
      return '';
    }
    const hours = match[1] ? match[1].replace('H', 'h ') : '';
    const minutes = match[2] ? match[2].replace('M', 'm') : '';

    return `${hours}${minutes}`.trim();
  }

  /**
   * Formats date and time to be more user-friendly
   * @param dateTime 
   * @returns string 
   */
  formatDateTime(dateTime: string): string {
    const [date, time] = dateTime.split('T');
    const formattedDateTime = time.substring(0, 5);
    return `${date} ${formattedDateTime}`;
  }

  /**
   * Formats the booking ID to be more user-friendly
   * @param bookingId 
   * @returns string
   */
  formatBookingId(bookingId: string): string {
    const decoded = decodeURIComponent(bookingId);
    return decoded.replace(/=/g, ' ');
  }

  /**
   * Formats the price to be more user-friendly
   * @param price 
   * @returns string
   */
  trimPrice(price: string): string {
    const parsedPrice = parseFloat(price);
    if (Number.isInteger(parsedPrice)) {
      return parsedPrice.toString();
    } else {
      return parsedPrice.toFixed(2).replace('.', ',');
    }
  }



}
