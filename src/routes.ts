import { Express, Request, Response } from "express";
import {
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";

import { createSessionSchema } from "./schema/session.schema";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Users
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  // Sessions
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;
