# Enpoints and authentication

## Flights

**Note**: The following endpoints use the Amadeus client to interact with the Amadeus API. Below is described how to get a token without using the client.

### How to get a token

**Description**: How to access a bearer token for interaction with their API.

**Request:**
- Method: POST
- URL: `https://test.api.amadeus.com/v1/oauth2/token`
- Headers: `Content-Type: application/x-www-form-urlencoded`
- Body: 
    ```x-www-form-urlencoded
    grant_type=client_credentials
    &client_id={API_KEY}
    &client_secret={API_secret}
    ```

**Response:**
- Status: 200 OK / 400 Bad Request
- Body: 
    ```json
    {
        "type": "amadeusOAuth2Token",
        "username": "{username}",
        "application_name": "{application_name}",
        "client_id": "{API_KEY}",
        "token_type": "Bearer",
        "access_token": "{access_token}",
        "expires_in": 1799,
        "state": "approved",
        "scope": ""
    }
    ```


### `GET /api/flights/results`

**Description**: Fetch flight offers based on search criteria.

**Request:**
- Method: GET
- URL: `/api/flights/results`
- Headers: `Content-Type: application/json`
- Query Parameters:
    - `searchData` (constructed by `offerQuery.queryBuilder`).

**Response:**
- Status: 200 OK / 400 Bad Request / 500 Internal Server error
- Body: 
    ```json 
    {
        "rawResponse": [
            //Array of FlightOffers
        ],
        "extractedData": {
            "departureFlights": [
                //Array of FlightOffer to be displayed
            ]
        }
    }
    ```

### `POST /api/flights/confirm-offer`

**Description**: Confirm rates and availability for the selected offer.

**Request:**
- Method: POST
- URL: `api/flights/confirm-offer`
- Headers: `Content-Type: application/json`
- Body:
    ```json
    [
        //Array of the selected FlightOffers
    ]
    ```

**Response:**
- Status: 200 OK / 400 Bad Request / 500 Internal Server Error
- Body:
    ```json
    {
        //ConfirmOfferResponse
    }
    ```

### `POST /api/flights/create-booking`

**Description**: Create a new booking with user and flight data

**Request:**
- Method: POST
- URL: `/api/flights/create-booking`
- Headers: `Content-Type: application/json`  
- Body:
    ```json
    {
        "userId": "user-id",
        "bookingData": {
            //FlightOffers data
        },
        "travelers": [
            //Array of traveler data
        ]
    }
    ```

**Response:**
- Status: 200 OK / 400 Bad Request / 500 Internal Server Error
- Body:
    ```json
    {
        //BookingResponse which includes insertion in the database
    }
    ```

### `GET /api/flights/bookings/:userId`

**Description**: Fetch all bookings for a specific user

**Request:**
- Method: GET
- URL: `/api/flights/bookings/:userId`
- Headers: `Content-Type: application/json`

**Response:**
- Status: 200 OK / 404 Not Found / 400 Bad Request / 500 Internal Server Error
- Body:
    ```json
    [
        //Array of FetchBookings
    ]
    ```

