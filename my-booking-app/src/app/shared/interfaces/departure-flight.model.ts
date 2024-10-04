import { Flight } from './flight.model';

export interface DepartureFlight extends Flight {
    from: string;
    to: string;
}
