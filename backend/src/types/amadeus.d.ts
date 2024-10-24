/**
 * This file is used to define the types of the Amadeus API.
 */

declare module "amadeus" {

    export default class Amadeus {

        constructor(
            options: { 
                clientId: string; 
                clientSecret: string; 
                hostname?: string 
            }
        );

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
            
            flightOffers: {
                pricing: {
                    post(data: string): Promise<{ data: any }>;
                };
            };
        };

        booking: {
            flightOrders: {
                post(data: {
                        type: string;
                        flightOffers: any[];
                        travelers: [{
                            id: string;
                            dateOfBirth: string;
                            name: {
                                firstName: string;
                                lastName: string;
                            },
                            gender: string;
                            contact: {
                                emailAddress: string;
                                phones: [{
                                    deviceType: string;
                                    countryCallingCode: string;
                                    number: string;
                                }]
                            },
                            documents: [{
                                documentType: string;
                                birthPlace: string;
                                issueLocation: string;
                                issueDate: string;
                                number: string;
                                expiryDate: string;
                                issuanceCountry: string;
                                validityCountry: string;
                                nationality: string;
                                holder: boolean;
                            }]
                        }]
                }): Promise<{ data: any }>;
                
            };
        }
    }
}
