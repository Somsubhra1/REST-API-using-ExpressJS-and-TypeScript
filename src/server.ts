import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  log.info(`Server is running on port ${port}`);
  connect();
});
