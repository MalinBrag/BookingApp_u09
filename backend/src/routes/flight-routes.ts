import { Router } from "express";
import { flightController } from "../controllers/flight-controller";
import { verifyUserToken } from "../middlewares/verify-user-token";

const flightRouter = Router();

flightRouter.get('/results', flightController.getFlights);
flightRouter.post('/confirm-offer', flightController.confirmPricing);

flightRouter.post('/create-booking', verifyUserToken, flightController.createBooking);
flightRouter.get('/bookings/:userId', verifyUserToken, flightController.getBookings);

export default flightRouter;


