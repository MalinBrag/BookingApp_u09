"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flight_controller_1 = require("../controllers/flight-controller");
const verify_user_token_1 = require("../middlewares/verify-user-token");
const flightRouter = (0, express_1.Router)();
/**
 * Routes for the flight search and booking, some routes are protected by the verifyUserToken middleware
 */
flightRouter.get('/results', flight_controller_1.flightController.getFlights);
flightRouter.post('/confirm-offer', flight_controller_1.flightController.confirmPricing);
flightRouter.post('/create-booking', verify_user_token_1.verifyUserToken, flight_controller_1.flightController.createBooking);
flightRouter.get('/bookings/:userId', verify_user_token_1.verifyUserToken, flight_controller_1.flightController.getBookings);
exports.default = flightRouter;
