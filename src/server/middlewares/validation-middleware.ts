import { NextRequest } from "next/server";
import { ZodError, ZodSchema } from "zod";
import { HTTPError } from "./error-middleware";
import { Handler, Middleware } from "./compose-middlewares";

export interface ParsedBodyReqType extends NextRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsedBody?: any;
}
export function withValidation(schema: ZodSchema): Middleware {
  return (handler: Handler): Handler => {
    return async (req: ParsedBodyReqType, context: Record<string, unknown>) => {
      try {
        if (["POST", "PUT", "PATCH"].includes(req.method || "")) {
          const body = await req.json();
          schema.parse(body);
          req.parsedBody = schema.parse(body);
        }
        return await handler(req, context);
      } catch (error) {
        if (error instanceof ZodError) {
          const errorString = error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join(", ");
          throw new HTTPError(errorString, 400);
        }
        throw error;
      }
    };
  };
}
