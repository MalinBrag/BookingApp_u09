//för att displaya i browsern
import { Passenger } from './passenger.class';

export interface FlightOffer {
    flightNumber: string;
    departureDate: string;
    departureDateTime: string;
    arrivalDateTime: string;
    departureAirport: string;    
    arrivalAirport: string;
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


