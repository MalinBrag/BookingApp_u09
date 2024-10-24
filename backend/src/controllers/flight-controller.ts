import Amadeus from "amadeus";
import { Request, Response } from "express";
import { client } from "../config/db";

const dbName = 'u09';

/**
 * Create a new instance of the Amadeus API client
 */
const amadeus = new Amadeus({
    clientId: process.env.API_KEY as string,
    clientSecret: process.env.API_SECRET as string,
    hostname: 'test'
})

export const flightController = {

    /**
     * Get flight offers based on the provided query parameters
     * @param req 
     * @param res 
     * @returns an array of flight offers
     */
    getFlights: async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.query.departureDate) {
                res.status(400).json({ message: 'Missing required parameters' });
                return;
            }

            const response = await amadeus.shopping.flightOffersSearch.get({
                originLocationCode: req.query.originLocationCode as string,
                destinationLocationCode: req.query.destinationLocationCode as string,
                departureDate: req.query.departureDate as string,
                returnDate: req.query.returnDate as string,
                adults: req.query.adults as string,
                nonStop: req.query.nonStop as string,
                currencyCode: req.query.currencyCode as string,
                max: req.query.max as string
            });

            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
            res.status(500).json({ message: 'Server error during fetching flights' });
        }
    },

    /**
     * Confirm pricing and availability of the selected flight offers
     * @param req 
     * @param res 
     * @returns a string confirmation of the flight offer
     */
    confirmPricing: async (req: Request, res: Response): Promise<void> => {
        try {
            const flightOffers = req.body;
           
            if (!flightOffers || flightOffers.length === 0) {
                res.status(400).json({ message: 'No flight offers provided' });
                return;
            } 

            const response = await amadeus.shopping.flightOffers.pricing.post(
                JSON.stringify({ 
                    data: { 
                        type: 'flight-offers-pricing', 
                        flightOffers: flightOffers 
                    }
                }) as string
            );
            
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error confirming pricing:', error);
            res.status(500).json({ message: 'Server error during confirming pricing' });
        }
    },

    /**
     * Create a booking with the Amadeus API and save it to the database
     * @param req 
     * @param res 
     * @returns the booking data from the API and the inserted booking ID
     */
    createBooking: async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.body.userId;
            const flight = req.body.bookingData;
            const travelers = req.body.travelers;
            
            if (!flight || !userId) {
                res.status(400).json({ message: 'Booking data is missing' });
                return;
            }

            const flightOffers = [flight];
            const payload = {
                data: {
                    type: 'flight-order',
                    flightOffers: flightOffers,
                    travelers: travelers
                }
            };

            const response = await amadeus.booking.flightOrders.post(JSON.stringify(payload) as any);
            const saveResult = await flightController.saveBookingToDb(userId, response.data);

            res.status(200).json({
                message: 'Booking created and saved successfully',
                bookingData: response.data,
                bookingId: saveResult.insertedId
            });
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ message: 'Server error during creating booking' });
        }
    },

    /**
     * Save the booking data to the database
     * @param userId 
     * @param bookingData 
     * @returns the result of the insert operation
     */
    saveBookingToDb: async (userId: string, bookingData: object) => {
        try {
            const db = client.db(dbName);
            const collection = db.collection('Bookings');
            const newBooking = {
                userId: userId,
                bookingData: bookingData,
                createdAt: new Date(),
            };

            const result = await collection.insertOne(newBooking);
            return result;
        } catch (error) {
            console.error('Error saving booking to database:', error);
            throw new Error('Error saving booking to database');
        }
    },

    /**
     * Gets all bookings from the database, for a specific user
     * @param req 
     * @param res 
     * @returns an array of bookings
     */
    getBookings: async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.userId;

            if (!userId) {
                res.status(400).json({ message: 'User ID is missing' });
                return;
            }

            const db = client.db(dbName);
            const collection = db.collection('Bookings');
            const bookings = await collection.find({ userId: userId }).toArray();

            if (!bookings || bookings.length === 0) {
                res.status(404).json({ message: 'No bookings found for this user' });
                return;
            }
          
            res.status(200).json(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).json({ message: 'Server error during fetching bookings' }); 
        }
    }

}

