import User, { UserDocument } from "./../model/user.model";
import Session, { SessionDocument } from "../model/session.model";
import { decode, sign } from "../utils/jwt.utils";
import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user: any;
  session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const decoded = decode(refreshToken);
  if (!decoded || !get(decoded, "_id")) {
    return false;
  }

  const session = await Session.findById(get(decoded, "_id"));

  if (!session || !session?.valid) {
    return false;
  }

  const user = findUser({ _id: session.user });

  if (!user) {
    return false;
  }

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
