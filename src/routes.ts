import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from "./schema/post.schema";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "./controller/session.controller";
import { requiresUser, validateRequest } from "./middleware";
import {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
} from "./controller/post.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

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

  app.get("/api/user/sessions", requiresUser, getUserSessionsHandler);

  // Logout

  app.delete("/api/user/logout", requiresUser, invalidateUserSessionHandler);

  // POSTS routes

  app.post(
    "/api/post",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  app.put(
    "/api/post/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  app.get("/api/post/:postId", getPostHandler);

  app.delete(
    "/api/post/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );
}
