// Import statements
import { Handler, Middleware } from "./compose-middlewares";
import { Session } from "next-auth";
import { NextRequest } from "next/server";

import { HTTPError } from "./error-middleware";
import { ParsedBodyReqType } from "./validation-middleware";
import { auth } from "@/configs/auth";

// Extend NextRequest to include authUser
export interface AuthReqType extends ParsedBodyReqType {
  authUser?: Session | null;
}

// Updated authHandler middleware with proper types
export const authHandler: Middleware = (handler: Handler): Handler => {
  return async (req: NextRequest, context: Record<string, unknown>) => {
    try {
      // Authenticate user
      const authUser = await auth();
      console.log(authUser);

      // If user is not authenticated, return a 401 response
      if (!authUser) {
        throw new HTTPError("Unauthorized: User not authenticated.", 401);
      }

      // Assign authUser to the request and cast it to AuthReqType
      const reqWithUser = Object.assign(req, { authUser }) as AuthReqType;

      // Invoke the handler with the modified request
      return await handler(reqWithUser, context);
    } catch (error) {
      throw error;
    }
  };
};
