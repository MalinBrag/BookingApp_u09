import { FlightOffers } from './flight-offer.model';
import { Passenger } from './passenger.class';

/**
 * Interfaces for made bookings
 */


/**
 * BookingResponce from API
 */
export interface BookingResponse {
    bookingData: BookingData[];
    id: string;
    travelers: Passenger[];
}

/**
 * BookingData in raw format which is used in the API
 */
export interface BookingData {
    flightOffers: FlightOffers[];
}

/**
 * Fetching bookings from the database
 */
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




