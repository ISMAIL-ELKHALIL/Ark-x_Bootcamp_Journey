import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

export default {
  post: PORT,
};
