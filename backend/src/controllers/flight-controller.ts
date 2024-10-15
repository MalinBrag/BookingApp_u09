import Amadeus from "amadeus";
import { Request, Response } from "express";

const amadeus = new Amadeus({
    clientId: process.env.API_KEY as string,
    clientSecret: process.env.API_SECRET as string,
    hostname: 'test' // Use 'test' for sandbox environment, or 'production' for production
})

export const flightController = {

    getFlights: async (req: Request, res: Response): Promise<void> => {
        try {
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
                }) as any
            );
            
            console.log('Pricing confirmed:', response.data);
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error confirming pricing:', error);
            res.status(500).json({ message: 'Server error during confirming pricing' });
        }
    },

    createBooking: async (req: Request, res: Response): Promise<void> => {
        try {
            const flight = req.body.bookingData;
            const travelers = req.body.travelers;
              
            if (!flight) {
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

            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ message: 'Server error during creating booking' });
        }
    }


}

