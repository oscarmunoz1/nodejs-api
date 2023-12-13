import config from "config";
import connect from "./utils/connect";
import deserializeUser from "./middleware/deserializeUser";
import express from "express";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get("port") as number;

const app = express();

// Used to parse incoming request bodies with JSON payloads.
app.use(express.json());

// Used to set user object on req.locals.user if a valid access token is provided.
// Otherwise, if the access token is expired and a valid refresh token is provided,
// a new access token is issued and set on the response header.
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`Server listening on port: ${port}`);

  await connect();

  routes(app);
});
