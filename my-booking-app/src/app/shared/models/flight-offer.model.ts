export interface FlightOfferRequest {
    tripType: string;
    departureFlight: UserFormatFlightSearch;
}

export interface UserFormatFlightSearch {
    departureDate: string;
    locationFrom: string;
    locationTo: string;
    passengers: string;
}

export interface ApiFormatFlightSearch {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    adults: string;
    nonStop: string;
    currencyCode: string;
    max: number;
}

export interface ConfirmOfferResponse {
    bookingRequirements: BookingRequirements;
    flightOffers: FlightOffers[];
    type: string;
}
export interface BookingRequirements {
    emailAddressRequired: boolean;
    mobilePhoneNumberRequired: boolean;
}

//jag skickar samma till confirmOffer, som objekt
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


