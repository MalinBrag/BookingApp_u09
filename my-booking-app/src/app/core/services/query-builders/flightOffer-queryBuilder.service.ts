import { Injectable } from "@angular/core";
import { AirportService } from "../lookup-data/airport.service";
import { ApiFormatFlightSearch, FlightOfferRequest } from "../../../shared/models/flight-offer.model";

@Injectable({
  providedIn: 'root'
})
export class OfferQueryService {

    constructor(
        private airportService: AirportService,
    ) {}

    /**
     * Generates a query string for the flight search, based on the search data
     * @param searchData 
     * @returns a string with the query parameters for the flight search
     */
    queryBuilder(searchData: FlightOfferRequest): string {
        const queryParams: ApiFormatFlightSearch = { 
            originLocationCode: this.cityConverter(searchData.departureFlight.locationFrom),
            destinationLocationCode: this.cityConverter(searchData.departureFlight.locationTo),
            departureDate: searchData.departureFlight.departureDate,
            adults: searchData.departureFlight.passengers,
            nonStop: 'true',
            currencyCode: 'SEK',
            max: 3,
        };

        /** round trip not implemented */
       /* if (searchData.returnFlight && searchData.returnFlight.returnDate) {
            queryParams.returnDate = searchData.returnFlight.returnDate;
        } */

        return this.queryStringBuilder(queryParams);
    }

    /**
     * Builds the formatted query string for the flight search
     * @param queryParams 
     * @returns a formatted string
     */
    queryStringBuilder(queryParams: ApiFormatFlightSearch): string {
        return Object.keys(queryParams)
            .map((key) => 
                `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key as keyof ApiFormatFlightSearch])}`)
            .join('&');
    }

    /**
     * Returns the city name from the airport IATA code
     * @param city 
     * @returns string
     */
    cityConverter(city: string): string {
        return this.airportService.getCode(city);
    }








}


