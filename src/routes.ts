import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler } from "./controller/session.controller";
import validateRequest from "./middleware/validateRequest";

export default function (app: Express) {
  app.get("/healthcheck", (req, res) => res.sendStatus(200));

  // Register
  app.post(
    "/api/user/register",
    validateRequest(createUserSchema),
    createUserHandler
  );

  // Login
  app.post(
    "/api/user/login",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get user sessions

  // Logout
}
