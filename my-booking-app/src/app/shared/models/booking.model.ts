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




