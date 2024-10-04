import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor() { }

  registerUser(data: any) {
    console.log(data);
  }

  signInUser(data: any) {
    console.log(data);
  }










}
