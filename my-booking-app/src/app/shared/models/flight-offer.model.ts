/**
 * Interfaces for flight offers as returned or accepted by the Amadeus API
 */

/**
 * How the form search data is sent
 */
export interface UserFormatFlightSearch {
    departureDate: string;
    locationFrom: string;
    locationTo: string;
    passengers: string;
}

/**
 * How the API expects the data to be formatted
 */
export interface ApiFormatFlightSearch {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    adults: string;
    nonStop: string;
    currencyCode: string;
    max: number;
}

/**
 * How the first request is being sent
 */
export interface FlightOfferRequest {
    tripType: string;
    departureFlight: UserFormatFlightSearch;
}

/**
 * Flight offers returned by the API
 * The format the selected flight needs to be sent to the API confirming pricing and availability
 */
export interface FlightOffers {
    id: string;
    instantTicketingRequired?: boolean;
    isUpsellOffer?: boolean;
    itineraries: Itinerary[];
    lastTicketingDate?: string;
    lastTicketingDateTime?: string;
    nonHomogeneous?: boolean;
    numberOfBookableSeats: number;
    oneWay?: boolean;
    price: Price; 
    PricingOptions?: {
        fareType?: string[];
        includedCheckedBagsOnly?: boolean;
    }
    source?: string;
    travelerPricings: TravelerPricing[];
    type?: string;
    validatingAirlineCodes?: string[];
}

/**
 * Response from the API after confirming pricing and availability
 */
export interface ConfirmOfferResponse {
    bookingRequirements: BookingRequirements;
    flightOffers: FlightOffers[];
    type: string;
}

export interface BookingRequirements {
    emailAddressRequired: boolean;
    mobilePhoneNumberRequired: boolean;
}

/**
 * Interfaces needed to extract relevant data
 */

export interface Price {
    currency: string;
    grandTotal: string;
}

export interface Itinerary {
    segments: Segment[];
    duration: string;
}

export interface Segment { 
    arrival: LocationInfo;
    carrierCode: string;
    number: string;
    departure: LocationInfo;
    duration: string;
    operating: OperatingCarrier;
}

export interface OperatingCarrier {
    carrierCode: string;
}

export interface LocationInfo {
    iataCode: string;
    terminal: string;
    at: string;
}

export interface TravelerPricing {
    fareDetailsBySegment: FareDetailsBySegment[];
    travelerId: string;
    travelerType: string;
}

export interface FareDetailsBySegment { 
    brandedFareLabel: string; 
    cabin: string;
    class: string;
}


