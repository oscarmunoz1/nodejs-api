import {
  CreateCompanyInput,
  CreateEstablishmentInput,
  UpdateCompanyInput,
  UpdateEstablishmentInput,
} from "../schema/company.schema";
import { Request, Response } from "express";
import {
  createCompany,
  createEstablishment,
  findAndUpdateCompany,
  findAndUpdateEstablishment,
  findCompanies,
  findCompanyById,
} from "../service/company.service";

import { EstablishmentModel } from "../models/company.model";
import { WorksInModel } from "../models/user.model";
import logger from "../utils/logger";

export async function getCompaniesHandler(req: Request, res: Response) {
  const companies = await findCompanies();
  return res.send(companies);
}

export async function createCompanyHandler(
  req: Request<{}, {}, CreateCompanyInput["body"]>,
  res: Response
) {
  try {
    const body = req.body;
    const userId = res.locals.user._id;
    const company = await createCompany({ ...body, user: userId });
    return res.send(company);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateCompanyHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  try {
    const companyId = req.params.companyId;
    const update = req.body;

    const company = await findCompanyById({ _id: companyId });

    if (!company) {
      return res.sendStatus(404);
    }

    const updatedCompany = await findAndUpdateCompany(
      { _id: companyId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedCompany);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCompanyHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  const company = await findCompanyById({ _id: req.params.companyId });

  if (!company) {
    return res.sendStatus(404);
  }

  const establishments = await EstablishmentModel.find({
    company: req.params.companyId,
  });

  if (establishments) {
    company.establishments = establishments;
  }

  return res.send(company);
}

export async function getCompanyEmployeesHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  const company = await findCompanyById({ _id: req.params.companyId });
  if (!company) {
    return res.sendStatus(404);
  }
  // Return all users that work in the company with the given companyId, using the WorksInModel.
  const employees = await WorksInModel.find({ company: req.params.companyId });
  return res.send(employees);
}

// Establishments
export async function createEstablishmentHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  try {
    const body = req.body;
    const companyId = req.params.companyId;
    const company = await findCompanyById({ _id: companyId });
    if (!company) {
      return res.sendStatus(404);
    }
    const establishment = await createEstablishment(body, company);
    return res.send(establishment);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getEstablishmentsHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  if (!req.params.companyId) {
    return res.sendStatus(404);
  }
  const establishments = await EstablishmentModel.find({
    company: req.params.companyId,
  });
  return res.send(establishments);
}

export async function getEstablishmentHandler(
  req: Request<UpdateEstablishmentInput["params"]>,
  res: Response
) {
  const companyId = req.params.companyId;

  if (!companyId) {
    return res.sendStatus(404);
  }

  const establishment = await EstablishmentModel.findOne({
    _id: req.params.establishmentId,
    company: companyId,
  });

  if (!establishment) {
    return res.sendStatus(404);
  }

  return res.send(establishment);
}

export async function updateEstablishmentHandler(
  req: Request<UpdateEstablishmentInput["params"]>,
  res: Response
) {
  try {
    const { companyId, establishmentId } = req.params;
    const update = req.body;

    if (!companyId) {
      return res.sendStatus(404);
    }

    const establishment = await EstablishmentModel.findOne({
      _id: establishmentId,
      company: companyId,
    });

    if (!establishment) {
      return res.sendStatus(404);
    }

    const updatedEstablishment = await findAndUpdateEstablishment(
      { _id: establishmentId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedEstablishment);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
