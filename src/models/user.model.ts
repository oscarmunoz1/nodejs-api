import { CompanyDocument, EstablishmentDocument } from "./company.model";

import bcrypt from "bcrypt";
import config from "config";
import mongoose from "mongoose";

// User model

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export const UserModel = mongoose.model<UserDocument>("User", userSchema);

// WorksIn model

export interface WorksInDocument extends mongoose.Document {
  user: UserDocument["_id"];
  company: CompanyDocument["_id"];
  role: string;
  establishmentsInCharge: EstablishmentDocument["_id"][];
}

const worksInSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyModel",
    required: true,
  },
  role: { type: String, enum: ["CA", "DS", "DW", "DE"], required: true },
  establishmentsInCharge: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EstablishmentModel" },
  ],
  roleGroup: { type: mongoose.Schema.Types.ObjectId, ref: "GroupModel" },
});

export const WorksInModel = mongoose.model("WorksIn", worksInSchema);
