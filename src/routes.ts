import {
  createCompanyHandler,
  createEstablishmentHandler,
  getCompaniesHandler,
  getCompanyEmployeesHandler,
  getCompanyHandler,
  getEstablishmentHandler,
  getEstablishmentProductionsHandler,
  getEstablishmentProductsHandler,
  getEstablishmentsHandler,
  updateCompanyHandler,
  updateEstablishmentHandler,
} from "./controller/company.controller";
import {
  createCompanySchema,
  createEstablishmentSchema,
  partialUpdateCompanySchema,
  partialUpdateEstablishmentSchema,
} from "./schema/company.schema";
import {
  createUserHandler,
  getUsersHandler,
} from "./controller/user.controller";
import {
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";

import { Express } from "express";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";

function routes(app: Express) {
  // Users
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.get("/api/users", requireUser, getUsersHandler);

  // Sessions
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // Companies
  app.post(
    "/api/companies",
    [requireUser, validateResource(createCompanySchema)],
    createCompanyHandler
  );
  app.get("/api/companies", requireUser, getCompaniesHandler);
  app.get("/api/companies/:companyId", requireUser, getCompanyHandler);
  app.patch(
    "/api/companies/:companyId",
    [requireUser, validateResource(partialUpdateCompanySchema)],
    updateCompanyHandler
  );
  app.get(
    "/api/companies/:companyId/employees",
    requireUser,
    getCompanyEmployeesHandler
  );

  // Establishments
  app.post(
    "/api/companies/:companyId/establishments",
    [requireUser, validateResource(createEstablishmentSchema)],
    createEstablishmentHandler
  );
  app.get(
    "/api/companies/:companyId/establishments",
    requireUser,
    getEstablishmentsHandler
  );
  app.get(
    "/api/companies/:companyId/establishments/:establishmentId",
    requireUser,
    getEstablishmentHandler
  );
  app.patch(
    "/api/companies/:companyId/establishments/:establishmentId",
    [requireUser, validateResource(partialUpdateEstablishmentSchema)],
    updateEstablishmentHandler
  );
  app.get(
    "/api/companies/:companyId/establishments/:establishmentId/products",
    requireUser,
    getEstablishmentProductsHandler
  );
  app.get(
    "/api/companies/:companyId/establishments/:establishmentId/productions",
    requireUser,
    getEstablishmentProductionsHandler
  );
}

export default routes;
