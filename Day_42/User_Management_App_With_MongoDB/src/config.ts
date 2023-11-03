import { config } from "dotenv";
config();

const { PORT, MONGODB_URL } = process.env;

export default {
  port: PORT,
  mongodbUrl: MONGODB_URL,
};
