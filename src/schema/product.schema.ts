import { TypeOf, custom, object, string } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string().optional(),
  }),
};

const partialPayload = {
  body: object({
    name: string().optional(),
    description: string().optional(),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "ProductId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const partialUpdateProductSchema = object({
  ...partialPayload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type PartialUpdateProductInput = TypeOf<
  typeof partialUpdateProductSchema
>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
