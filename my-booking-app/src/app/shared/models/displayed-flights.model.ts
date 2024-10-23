import { Passenger } from './passenger.class';

/**
 * Interfaces of flights in the format they are displayed in the browser
 */

/**
 * Flight offers
 */
export interface FlightOffer {
    flightNumber: string;
    airlineName: string;
    departureDate: string;
    departureDateTime: string;
    arrivalDateTime: string;
    departureCity: string;
    departureAirport: string;
    departureAirportCode: string;
    arrivalCity: string;    
    arrivalAirport: string;
    arrivalAirportCode: string;
    duration: string;
    priceTotal: string;
    class: string;
    priceCurrency: string;
    availableSeats: number;
    numberOfPassengers: number;
}

/**
 * Booked flights
 */
export interface BookedFlight {
    createdOn: string;
    bookingId: string;
    flightNo: string;
    airlineName: string;
    depCity: string;
    depAirport: string;
    depTerminal: string;
    arrCity: string;
    arrAirport: string;
    arrTerminal: string;
    depDateTime: string;
    duration: string;
    priceTotal: string;
    passengersTotal: string;
    passengers: Passenger[];
}


