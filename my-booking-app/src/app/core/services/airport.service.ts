import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private airport = [
    { city: 'Paris', airport: 'Charles de Gaulle', code: 'CDG' },
    { city: 'Rome', airport: 'Fiumicino', code: 'FCO' },
    { city: 'Berlin', airport: 'Brandenburg', code: 'BER' },
    { city: 'New York', airport: 'John F. Kennedy', code: 'JFK' },
    { city: 'London', airport: 'Heathrow', code: 'LHR' },
    { city: 'Frankfurt', airport: 'Frankfurt Airport', code: 'FRA' },
    { city: 'Amsterdam', airport: 'Schiphol', code: 'AMS' },    
    { city: 'Tokyo', airport: 'Narita', code: 'NRT' },
    { city: 'Dubai', airport: 'Dubai International', code: 'DXB' },
  ];

  getCode(city: string): string {
    const matchingAirport = this.airport
      .find(airport => airport.city.toLowerCase() === city.toLowerCase())
    
    if (!matchingAirport) {
      throw new Error('No airports found for city: ${city}');
    }

    return matchingAirport.code;
  }

  getAirportByCode(code: string): { city: string, airport: string } {
    const matchingAirport = this.airport
      .find(airport => airport.code.toLowerCase() === code.toLowerCase());

      if (!matchingAirport) {
        throw new Error('No airports found for code: ${code}');
      }

      return { city: matchingAirport.city, airport: matchingAirport.airport };
  }

}



