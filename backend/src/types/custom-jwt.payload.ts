import { JwtPayload } from "jsonwebtoken";

/**
 * CustomJwtPayload interface.
 */
export interface CustomJwtPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
}

