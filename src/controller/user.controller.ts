import { Request, Response } from "express";
import { createUser, findUsers } from "../service/user.service";

import { CreateUserInput } from "../schema/user.schema";
import logger from "../utils/logger";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  const users = await findUsers();
  return res.send(users);
}
