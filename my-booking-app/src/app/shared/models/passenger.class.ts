import { RequiredUserData } from "./user.model";

export class Passenger {
    id: string;
    dateOfBirth: string = '1990-01-01';
    name: { firstName: string, lastName: string } = { firstName: '', lastName: 'Smith' };
    gender: string = 'FEMALE';
    contact = {
      emailAddress: '',
      phones: [{ deviceType: 'MOBILE', countryCallingCode: '46', number: '' }]
    };
    documents = [{
      documentType: 'PASSPORT',
      birthPlace: 'Stockholm',
      issuanceLocation: 'Stockholm',
      issuanceDate: '2021-01-01',
      number: '123456789',
      expiryDate: '2026-01-01',
      issuanceCountry: 'SE',
      validityCountry: 'SE',
      nationality: 'SE',
      holder: true
    }];
  
    constructor(id: string, userData?: RequiredUserData) {
      this.id = id;
      if (userData) {
        this.name.firstName = userData.name;
        this.contact.emailAddress = userData.email;
        this.contact.phones[0].number = userData.phone;
      }
    }
  }
  