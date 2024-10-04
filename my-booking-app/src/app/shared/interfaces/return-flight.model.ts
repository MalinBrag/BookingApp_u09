import { Flight } from './flight.model';

export interface ReturnFlight extends Flight {
    from: string;
    to: string;
}
