//för att displaya i browsern
import { Passenger } from './passenger.class';

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


