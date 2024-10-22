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

    queryStringBuilder(queryParams: ApiFormatFlightSearch): string {
        return Object.keys(queryParams)
            .map((key) => 
                `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key as keyof ApiFormatFlightSearch])}`)
            .join('&');
    }

    cityConverter(city: string): string {
        return this.airportService.getCode(city);
    }








}


