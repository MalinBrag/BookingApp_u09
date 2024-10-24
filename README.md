# BookingApp_u09

Booking App is a web application for booking flights with Amadeus REST API for test bookings.
It provides user authentication, flight search, booking, and admin management functionalities.


I have used the following technologies:
### Frontend
- **Angular** 18.2.0
- **Node.js** 20.16.0
- **Eslint** 8.57.1

### Backend
- **Express.js** 4.21.0
- **MongoDB** 6.9.0
- **JSON Web Token** 9.0.2
- **Amadeus client API** 10.1.0
- **Eslint** 9.13.0

## Features
- **Flight search**: Search for flight departures, all displayed flights are direct and the rates are real time rates. See all details down to departure and arrival terminal.
- **Book flights and save**: You can book flights and save to the database. Please note that no real reservation will be made, this is Amadeus test API, however populated with real time data.
- **User or admin authentication**: You can register as user and have your own profile page. If an admin registers you as an admin, then you can handle all the other users' data. All this is done with JWT token.

### Prerequisites 
- Node.js 
- npm
- MongoDB

## Installation
- Clone the repository.
- Navigate to backend and install dependencies "npm install".
- Navigate to frontend and install dependencies "npm install".
- Create an .env file in the backend dir and add variables for: 
    MongoDB URI, 
    JWT Secret, 
    server port, 
    API key from Amadeus 
    API Secret from Amadeus
- Start the backend server with "npm start".
- Navigate to frontend and start the server with "npm start".

## Documentation
All documentation is provided in root directory.


