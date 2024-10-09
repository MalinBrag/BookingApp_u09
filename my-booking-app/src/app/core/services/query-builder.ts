import { Injectable } from "@angular/core";
import { AirportService } from "./airport.service";

@Injectable({
  providedIn: 'root'
})
export class QueryBuilder {

    constructor(
        private airportService: AirportService,
    ) {}

    queryBuilder(searchData: any): string {
        const queryParams: any = {
            originLocationCode: this.cityConverter(searchData.departureFlight.locationFrom),
            destinationLocationCode: this.cityConverter(searchData.departureFlight.locationTo),
            departureDate: searchData.departureFlight.departureDate,
            adults: searchData.departureFlight.passengers,
            nonStop: 'true',
            currencyCode: 'SEK',
            max: 5,
        };

        if (searchData.returnFlight && searchData.returnFlight.returnDate) {
            queryParams.returnDate = searchData.returnFlight.returnDate;
        }

        return this.queryStringBuilder(queryParams);
    }

    queryStringBuilder(queryParams: any): string {
        return Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
    }

    cityConverter(city: string): string {
        return this.airportService.getCode(city);
    }








}


