declare module "amadeus" {

    export default class Amadeus {
        constructor(options: { clientId: string; clientSecret: string; hostname?: string });

        shopping: {
            flightOffersSearch: {
                
                get(params: {
                    originLocationCode: string;
                    destinationLocationCode: string;
                    departureDate: string;
                    returnDate?: string;
                    adults: string;
                    nonStop?: string;
                    currencyCode?: string;
                    max?: string;
                }): Promise<{ data: any }>;
            };
        };
    }
}
