export interface FlightOfferRequest {
    departureFlight: FlightSearch;
    tripType: string;
}

export interface FlightSearch {
    departureDate: string;
    locationFrom: string;
    locationTo: string;
    passengers: string;
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
    itineraries: Itinerary[];
    numberOfBookableSeats: number;
    price: Price; 
    travelerPricings: TravelerPricing[];
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


