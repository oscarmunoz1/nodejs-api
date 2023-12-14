import {
  CompanyDocument,
  EstablishmentDocument,
  EstablishmentModel,
} from "../models/company.model";
import {
  CompanyInput,
  CompanyModel,
  EstablishmentInput,
} from "../models/company.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import { WorksInModel } from "../models/user.model";
import logger from "../utils/logger";

export async function findCompanies() {
  try {
    const companies = await CompanyModel.find();
    return companies;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findCompanyById(
  query: FilterQuery<CompanyDocument>
): Promise<CompanyDocument | null> {
  try {
    const company = await CompanyModel.findOne(query).lean();
    return company;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function createCompany(company: CompanyInput) {
  try {
    const result = await CompanyModel.create(company);
    await WorksInModel.create({
      user: company.user,
      company: result._id,
      role: "CA",
    });
    return result.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findAndUpdateCompany(
  query: FilterQuery<CompanyDocument>, // FilterQuery is a type that takes in a generic type,
  // in this case, CompanyDocument (which is a mongoose document)  and returns a type that is a query
  update: UpdateQuery<CompanyDocument>,
  options: QueryOptions
) {
  try {
    const company = await CompanyModel.findOneAndUpdate(query, update, options);
    return company;
  } catch (e: any) {
    throw new Error(e);
  }
}

// Establishments

export async function createEstablishment(
  establishment: EstablishmentInput,
  company: CompanyDocument
) {
  try {
    const result = await EstablishmentModel.create({
      ...establishment,
      company: company._id,
    });
    return result.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findAndUpdateEstablishment(
  query: FilterQuery<EstablishmentDocument>,
  update: UpdateQuery<EstablishmentDocument>,
  options: QueryOptions
) {
  try {
    const establishment = await EstablishmentModel.findOneAndUpdate(
      query,
      update,
      options
    );
    return establishment;
  } catch (e: any) {
    throw new Error(e);
  }
}
