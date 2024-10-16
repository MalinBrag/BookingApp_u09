import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderCreateService {

  constructor() {}

  queryBuilderUser(userData: any, numberOfPassengers: any): any {
    const travelers = [];
    for (let i = 1; i <= numberOfPassengers; i++) {
      travelers.push({
        id: i.toString(),
        dateOfBirth: '1990-01-01',
        name: {
          firstName: userData.name,
          lastName: 'Smith',
        },
        gender: 'FEMALE',
        contact: {
          emailAddress: userData.email,
          phones: [{
            deviceType: 'MOBILE',
            countryCallingCode: '46',
            number: userData.phone,
          }],
        },
        documents: [{
          documentType: 'PASSPORT',
          birthPlace: 'Stockholm',
          issuanceLocation: 'Stockholm',
          issuanceDate: '2020-01-01',
          number: '123456789',
          expiryDate: '2025-01-01',
          issuanceCountry: 'SE',
          validityCountry: 'SE',
          nationality: 'SE',
          holder: true,
        }]
      });
    }
    return travelers;
  } 


    
}


