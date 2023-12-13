import config from "config";
import logger from "./logger";
import mongoose from "mongoose";

async function connect() {
  const dbUri = config.get("dbUri") as string;

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected successfully");
  } catch (error) {
    logger.error("DB connection failed");
    process.exit(1);
  }
}

export default connect;
