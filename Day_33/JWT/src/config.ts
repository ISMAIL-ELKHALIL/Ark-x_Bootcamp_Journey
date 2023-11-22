import dotenv from "dotenv";
dotenv.config();

const { PORT, SALT } = process.env;

const { ACCESS_TOKEN_PRIVET_KEY, REFRESH_TOKEN_PRIVET_KEY } = process.env;

export default {
  port: PORT,
  salt: SALT,
  accessTokenPrivetKey: ACCESS_TOKEN_PRIVET_KEY,
  refreshTokenPrivetKey: REFRESH_TOKEN_PRIVET_KEY,
};
