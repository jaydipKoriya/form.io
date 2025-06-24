import { z } from "zod";
import { optional } from "zod/v4";

export const FieldConfigurationSchema=z.object({
    label:z.string().min(4,'Label must be 4 charecter long'),
    required: z.boolean(),
    size:z.number().optional(),
    maxLength:z.number().optional(),
    minLength:z.number().optional(),
    options:z.array(z.object({
        label:z.string().min(1,'option value is required'),

        value:z.string().min(1,'option value is required')
    })).optional()
})


export type FieldConfiguration=z.infer<typeof FieldConfigurationSchema>