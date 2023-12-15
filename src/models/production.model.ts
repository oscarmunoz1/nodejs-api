import { ParcelDocument, ProductDocument } from "./product.model";

import mongoose from "mongoose";

// Production model

export interface ProductionDocument extends mongoose.Document {
  name: string;
  type: string;
  startDate: Date;
  finishDate: Date;
  published: boolean;
  description: string;
  product: ProductDocument["_id"];
  parcel: ParcelDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductionInput {
  name: string;
  type: string;
  startDate: Date;
  finishDate: Date;
  published: boolean;
  description: string;
}

const productionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    published: { type: Boolean, required: true },
    description: { type: String, required: false },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" },
    parcel: { type: mongoose.Schema.Types.ObjectId, ref: "ParcelModel" },
  },
  {
    timestamps: true,
  }
);

export const ProductionModel = mongoose.model<ProductionDocument>(
  "Production",
  productionSchema
);
