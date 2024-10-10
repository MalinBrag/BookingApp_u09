import { Router } from "express";
import { flightController } from "../controllers/flight-controller";

const flightRouter = Router();

flightRouter.get('/results', flightController.getFlights);

export default flightRouter;


