import { singin_controller } from "@/server/controllers/auth";
import { authHandler } from "@/server/middlewares/auth-middleware";
import { composeMiddleware } from "@/server/middlewares/compose-middlewares";
import { errorHandler } from "@/server/middlewares/error-middleware";
export const runtime = "edge";
export const POST = errorHandler(
  composeMiddleware(authHandler)(singin_controller)
);
