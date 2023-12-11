import config from "config";
import connect from "./utils/connect";
import express from "express";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get("port") as number;

const app = express();

app.listen(port, async () => {
  logger.info(`Server listening on port: ${port}`);

  await connect();

  routes(app);
});
