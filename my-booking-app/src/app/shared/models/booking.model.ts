//så som jag skickar bokningsförfrågan

import { FlightOffers } from './flight-offer.model';
import { Passenger } from './passenger.class';

export interface BookingResponse {
    bookingData: BookingData[];
    id: string;
    travelers: Passenger[];
}

export interface BookingData {
    flightOffers: FlightOffers[];
}

export interface FetchBookings {
    bookingData: {
        flightOffers: FlightOffers[];
        travelers: Passenger[];
        id: string;
        type: string;
    }
    createdAt: string;
    userId: string;
    _id?: string;
}




