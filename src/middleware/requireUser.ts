import { NextFunction, Request, Response } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    return res.status(403).send({
      error: "You must be logged in to perform this action",
    });
  }

  return next();
};

export default requireUser;
