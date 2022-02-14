import mongoose from "mongoose";
import config from "config";
import log from "../logger";

export default () => {
  const dbUri = config.get("dbURI") as string;

  return mongoose
    .connect(dbUri)
    .then(() => log.info("Database successfully connected"))
    .catch((err) => {
      log.error("Couldn't connect to DB", err);
      process.exit(1);
    });
};
