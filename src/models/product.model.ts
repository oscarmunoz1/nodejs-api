import { EstablishmentDocument } from "./company.model";
import { ProductionDocument } from "./production.model";
import mongoose from "mongoose";

// Product model

export interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  name: string;
  description: string;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);

// Parcel model

export interface ParcelDocument extends mongoose.Document {
  name: string;
  description: string;
  establishment: EstablishmentDocument["_id"];
  product: ProductDocument["_id"];
  currentProduction: ProductionDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

export interface ParcelInput {
  name: string;
  description: string;
}

const parcelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    establishment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EstablishmentModel",
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" },
    currentProduction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionModel",
    },
  },
  {
    timestamps: true,
  }
);

export const ParcelModel = mongoose.model<ParcelDocument>(
  "Parcel",
  parcelSchema
);
