import { User } from './user.model';

export interface LoginResponse {
    token: string;
    userId: string;
    role: string;
}