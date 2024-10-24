import { CustomJwtPayload } from "./custom-jwt.payload";

/**
 * Custom made jwt payload to be used in the request object
 */
declare module 'express-serve-static-core' {
    interface Request {
        user?: CustomJwtPayload;
    }
}

