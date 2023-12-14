import mongoose from "mongoose";

// Company model

export interface CompanyDocument extends mongoose.Document {
  name: string;
  tradename: string;
  address: string;
  city: string;
  state: string;
  country: string;
  logo: Buffer;
  description: string;
  invitationCode: string;
  createdAt: Date;
  updatedAt: Date;
  establishments: EstablishmentDocument[];
}

export interface CompanyInput {
  name: string;
  tradename?: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  logo?: Buffer;
  description?: string;
  invitationCode?: string;
  user: number;
}

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tradename: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "Uruguay", required: true },
    logo: { type: Buffer, required: false },
    description: { type: String, required: false },
    invitationCode: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = mongoose.model<CompanyDocument>(
  "Company",
  companySchema
);

// Establishment model

export interface EstablishmentDocument extends mongoose.Document {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  company: CompanyDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

export interface EstablishmentInput {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  company: string;
}

const establishmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: false },
    state: { type: String, required: true },
    country: { type: String, default: "Uruguay", required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EstablishmentModel = mongoose.model<EstablishmentDocument>(
  "Establishment",
  establishmentSchema
);
