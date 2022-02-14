import { Express, Request, Response } from "express";

export default function (app: Express) {
  app.get("/healthcheck", (req, res) => res.sendStatus(200));

  // Register

  // Login

  // Get user sessions

  // Logout
}
