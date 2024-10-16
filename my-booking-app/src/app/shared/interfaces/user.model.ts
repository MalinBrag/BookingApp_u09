export interface User {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
    role?: string;
}

export interface PassengerData {
    id: string;
    birthDate: string;
    name: [{
        firstName: string,
        lastName: string
    }];
    gender: string;
    contact: {
        emailAddress: string;
        phones: [{
            deviceType: string;
            countryCallingCode: string;
            number: string;
        }];
    };
    documents: [{
        documentType: string;
        birthPlace: string;
        issuanceLocation: string;
        issuanceDate: string;
        number: string;
        expiryDate: string;
        issuanceCountry: string;
        validityCountry: string;
        nationality: string;
        holder: string;
    }];
}
