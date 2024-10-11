export interface Flight {
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    priceTotal: string;
    priceCurrency: string;
    duration: string;
    departureAirport: string;    
    arrivalAirport: string;
    availableSeats: number;
}

export interface FlightSearchData {
    tripType: string;
    departureFlight: FlightDetails;
    returnFlight: FlightDetails;
}

export interface FlightDetails {
    departureDate: string;
    returnDate?: string;
    locationFrom: string;
    locationTo: string;
    passengers: string;
}

export interface FlightOfferResponse {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: Price;
    pricingOptions: PricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
}
  
export interface Itinerary {
    duration: string;
    segments: Segment[];
}
  
export interface Segment {
    departure: LocationInfo;
    arrival: LocationInfo;
    carrierCode: string;
    number: string;
    aircraft: Aircraft;
    operating: OperatingCarrier;
    duration: string;
    id: string;
    numberOfStops: number;
}
  
export interface LocationInfo {
    iataCode: string;
    terminal?: string;
    at: string;
}
  
export interface Aircraft {
    code: string;
}
  
export interface OperatingCarrier {
    carrierCode: string;
}
  
export interface Price {
    currency: string;
    total: string;
    base: string;
    fees: Fee[];
    grandTotal: string;
}
  
export interface Fee {
    amount: string;
    type: string;
}
  
export interface PricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
}
  
export interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: TravelerPrice;
    fareDetailsBySegment: FareDetailsBySegment[];
}
  
export interface TravelerPrice {
    currency: string;
    total: string;
    base: string;
}

export interface FareDetailsBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    brandedFare: string;
    brandedFareLabel: string;
    class: string;
    includedCheckedBags: CheckedBags;
}
  
export interface CheckedBags {
    quantity: number;
}
  