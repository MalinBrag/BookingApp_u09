import { Injectable } from "@angular/core";
import { Passenger } from "../../../shared/models/passenger.class";

@Injectable({
  providedIn: 'root'
})
export class passengerObjectService {

  constructor() {}

  createPassengers(userData: any, numberOfPassengers: any): any {
    const travelers: Passenger[] = [];

    for (let i = 1; i <= numberOfPassengers; i++) {
      const passenger = new Passenger(i.toString(), userData);
      travelers.push(passenger);
    }

    return travelers;
  } 


}


