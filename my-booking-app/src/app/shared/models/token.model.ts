/**
 * Interface for the decoded token
 */

export interface DecodedToken {
    exp: number;
    iat: number;
    id: string;
    role: string;
}