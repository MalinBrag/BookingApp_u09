/**
 * Interface for the decoded token
 */

export interface DecodedToken {
    exp: number;
    iat: number;
    email?: string;
    id: string;
    role: string;
}