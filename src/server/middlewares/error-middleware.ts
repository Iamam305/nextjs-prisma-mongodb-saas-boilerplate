import { AuthReqType } from "./auth-middleware";
import { Handler, Middleware } from "./compose-middlewares";
import { NextRequest, NextResponse } from "next/server";
export const errorHandler: Middleware = (handler: Handler): Handler => {
  return async (
    req: NextRequest | AuthReqType,
    context: Record<string, unknown>
  ) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.log(
        "Error:",
        {
          method: req.method,
          url: req.nextUrl?.pathname,
          timeStamp: new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date()),
        },
        error instanceof HTTPError ? error.message : error
      );

      return NextResponse.json(
        {
          message:
            error instanceof HTTPError
              ? error.message
              : "Internal Server Error",
        },
        {
          status: error instanceof HTTPError ? error.statusCode : 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
};

export class HTTPError extends Error {
  statusCode: number;
  /**
   * A class representing an HTTP error.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HTTPError";
    this.statusCode = statusCode;
  }
}
