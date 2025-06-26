import { z } from "zod";
import type { Field } from "../Types/FormBuilder/Form";

function getFieldSchema(field: Field) {
    const { required, type, maxLength, minLength, options } = field;
    var tempSchema;

    switch (field.type) {
        case 'text':
        case 'email':
            tempSchema = z.coerce.string();
            if (minLength)
                tempSchema = tempSchema.min(minLength, `${minLength} minimum length required`)
            if (maxLength)
                tempSchema = tempSchema.min(maxLength, `${maxLength} maximum length required`)
            if (required)
                tempSchema = tempSchema.min(1, 'This field is required')
            break;
        case 'number':
            tempSchema = z.coerce.number();
            if (minLength)
                tempSchema = tempSchema.min(minLength, `${minLength} minimum length required`)
            if (maxLength)
                tempSchema = tempSchema.min(maxLength, `${maxLength} maximum length required`)
            if (required)
                tempSchema = tempSchema.min(1, 'This field is required')
            break;
        case 'checkbox':
            tempSchema = z.array(z.string());
            if (!required)
                tempSchema = tempSchema.optional();
            else
                tempSchema = tempSchema.min(1, "Please make a selection");
            break;
        case "radio":
        case "select":
            tempSchema = z.string();
            if (required) {
                tempSchema = tempSchema.min(1, "Please make a selection");
            } else {
                tempSchema = tempSchema.optional();
            }
            break;
        default:
            tempSchema = z.any()
    }
}

const ZodSchemaGenerater = (fields: Field[]) => {
    let baseType = {};
    fields.map((field:any) => {
        baseType[field.label]: getFieldSchema(field)
    })
    return z.object(baseType)
}

export default ZodSchemaGenerater