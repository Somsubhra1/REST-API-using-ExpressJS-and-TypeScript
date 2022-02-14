import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  host: "localhost",
  dbURI: process.env.dbURI,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: process.env.privateKey,
};
