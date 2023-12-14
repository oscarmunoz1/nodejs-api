import { TypeOf, custom, object, string } from "zod";

const BufferType = custom<Buffer>((data) => {
  if (Buffer.isBuffer(data)) {
    return data;
  } else {
    throw new Error("Invalid Buffer data");
  }
});

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    tradename: string().optional(),
    address: string().optional(),
    city: string({
      required_error: "City is required",
    }),
    state: string({
      required_error: "State is required",
    }),
    country: string({
      required_error: "Country is required",
    }),
    logo: BufferType.optional(),
    description: string().optional(),
    invitationCode: string().optional(),
  }),
};

const partialPayload = {
  body: object({
    name: string().optional(),
    tradename: string().optional(),
    address: string().optional(),
    city: string().optional(),
    state: string().optional(),
    country: string().optional(),
    logo: BufferType.optional(),
    description: string().optional(),
    invitationCode: string().optional(),
  }),
};

const params = {
  params: object({
    companyId: string({
      required_error: "CompanyId is required",
    }),
  }),
};

export const createCompanySchema = object({
  ...payload,
});

export const partialUpdateCompanySchema = object({
  ...partialPayload,
  ...params,
});

export const updateCompanySchema = object({
  ...payload,
  ...params,
});

export const deleteCompanySchema = object({
  ...params,
});

export type CreateCompanyInput = TypeOf<typeof createCompanySchema>;
export type PartialUpdateCompanyInput = TypeOf<
  typeof partialUpdateCompanySchema
>;
export type UpdateCompanyInput = TypeOf<typeof updateCompanySchema>;
export type DeleteCompanyInput = TypeOf<typeof deleteCompanySchema>;

// Establishments

const establishmentPayload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    address: string({
      required_error: "Address is required",
    }),
    city: string({
      required_error: "City is required",
    }),
    state: string({
      required_error: "State is required",
    }),
    country: string({
      required_error: "Country is required",
    }),
  }),
};

const partialEstablishmentPayload = {
  body: object({
    name: string().optional(),
    address: string().optional(),
    city: string().optional(),
    state: string().optional(),
    country: string().optional(),
  }),
};

const establishmentParams = {
  params: object({
    companyId: string({
      required_error: "CompanyId is required",
    }),
    establishmentId: string({
      required_error: "EstablishmentId is required",
    }),
  }),
};

export const createEstablishmentSchema = object({
  ...establishmentPayload,
  ...params,
});

export const partialUpdateEstablishmentSchema = object({
  ...partialEstablishmentPayload,
  ...establishmentParams,
});

export const updateEstablishmentSchema = object({
  ...establishmentPayload,
  ...establishmentParams,
});

export type CreateEstablishmentInput = TypeOf<typeof createEstablishmentSchema>;
export type PartialUpdateEstablishmentInput = TypeOf<
  typeof partialUpdateEstablishmentSchema
>;
export type UpdateEstablishmentInput = TypeOf<typeof updateEstablishmentSchema>;
