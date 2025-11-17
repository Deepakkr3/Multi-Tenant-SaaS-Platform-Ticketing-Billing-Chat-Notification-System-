import { Request } from 'express';


/**
 * Extends the default Express Request interface to include additional user-related fields.
 *
 * This extension allows middleware or route handlers to attach authenticated user information
 * to the request object, enabling easier access to user identity and authorization details.
 *
 * @property userId - (optional) A unique identifier for the authenticated user.
 * @property username - (optional) The username of the authenticated user.
 * @property identificationKey - (optional) A custom key used for identifying the user (e.g., email, phone, etc.).
 * @property userType - (optional) Describes the type of user (e.g., 'admin', 'customer', 'internal', etc.).
 * @property [key: string] - Allows any additional properties to be dynamically attached to the request.
 *
 * @example
 * // Accessing in middleware:
 * const userId = req.userId;
 * const userType = req.userType;
 *
 * @author Vikas
 * @lastModified April 14, 2025
 */
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      username?: string;
      identificationKey?: string;
      userType?: string;

      [key: string]: any;
    }
  }
}
