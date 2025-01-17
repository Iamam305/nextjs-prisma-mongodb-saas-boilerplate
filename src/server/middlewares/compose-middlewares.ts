import { NextRequest, NextResponse } from "next/server";
import { AuthReqType } from "./auth-middleware";

export type Handler = (
  req: NextRequest | AuthReqType,
  context: Record<string, unknown>
) => Promise<Response> | NextResponse;

export type Middleware = (handler: Handler) => Handler;

export function composeMiddleware(...middlewares: Middleware[]): Middleware {
  return (handler: Handler): Handler => {
    return middlewares.reduceRight(
      (acc, middleware) => middleware(acc),
      handler
    );
  };
}
