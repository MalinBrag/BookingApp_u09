import { Injectable } from "@angular/core";
import { Passenger } from "../../../shared/models/passenger.class";
import { RequiredUserData } from "../../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class passengerObjectService {

  constructor() {}

  /**
   * Creates a new passenger object for each passenger
   * @param userData 
   * @param numberOfPassengers 
   * @returns An array of passenger objects
   */
  createPassengers(userData: RequiredUserData, numberOfPassengers: number): Passenger[] { 
    const travelers: Passenger[] = [];

    for (let i = 1; i <= numberOfPassengers; i++) {
      const passenger = new Passenger(i.toString(), userData);
      travelers.push(passenger);
    }

    return travelers;
  } 


}


