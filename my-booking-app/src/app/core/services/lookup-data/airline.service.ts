import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AirlineService {
    private airlines = [
        { name: 'Air France', code: 'AF' },
        { name: 'Alitalia', code: 'AZ' },
        { name: 'Lufthansa', code: 'LH' },
        { name: 'British Airways', code: 'BA' },
        { name: 'KLM', code: 'KL' },
        { name: 'Delta Air Lines', code: 'DL' },
        { name: 'United Airlines', code: 'UA' },
        { name: 'American Airlines', code: 'AA' },
        { name: 'Emirates', code: 'EK' },
        { name: 'Japan Airlines', code: 'JL' },
        { name: 'All Nippon Airways', code: 'NH' },
        { name: 'Qatar Airways', code: 'QR' },
        { name: 'Singapore Airlines', code: 'SQ' },
        { name: 'Turkish Airlines', code: 'TK' },
        { name: 'Swiss International Air Lines', code: 'LX' },
        { name: 'Etihad Airways', code: 'EY' },
        { name: 'Cathay Pacific', code: 'CX' },
        { name: 'Qantas', code: 'QF' },
        { name: 'Aeroflot', code: 'SU' },
        { name: 'Finnair', code: 'AY' }
    ];

    getAirlineByCode(code: string): string {
        const matchingAirline = this.airlines.find(airline => airline.code.toLowerCase() === code.toLowerCase());
        return matchingAirline ? matchingAirline.name : code;
    } 



}


