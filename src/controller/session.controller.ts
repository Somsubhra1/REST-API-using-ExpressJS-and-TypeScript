import config from "config";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, createAccessToken } from "../service/session.service";
import { sign } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"), // 1 year
  });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}
