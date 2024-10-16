import { Injectable } from '@angular/core';
import { Flight, FlightOffers, BookedFlight } from '../../../shared/interfaces/flight.model';
import { AirportService } from '../lookup-data/airport.service';
import { PassengerData } from '../../../shared/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataService {

  constructor(
    private airportService: AirportService,
  ) { }

  flightOfferData(response: FlightOffers[]): Flight[] {
    return response.map((flight: FlightOffers) => ({
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
      }
    });
  }

  bookedPassengerData(response: any): BookedFlight[] {
    return response.map((booking: any) => {
      return booking.bookingData.travelers.map((passenger: PassengerData) => ({
        passengerId: passenger.id,
        passengerName: passenger.name,
        passengerBirthDate: passenger.birthDate,
        documentType: passenger.documents[0].documentType,
      }));
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

  getSelectedFlightByIndex(departureIndex: number, rawResponse: FlightOffers[]) {
    const selectedFlight: FlightOffers[] = [];
    
    if (departureIndex !== null) {
        selectedFlight.push(rawResponse[departureIndex]);
    }

    return selectedFlight;
  }



}
