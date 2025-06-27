import { z } from "zod";
import type { Field } from "../Types/FormBuilder/Form";

function getFieldSchema(field: Field) {
    const { required, type, maxLength, minLength, fileType } = field;
    console.log(fileType);
    let tempSchema;

    switch (type) {
        case 'text':
        case 'password':
            tempSchema = z.string();
            if (minLength)
                tempSchema = tempSchema.refine((val) => val.length >= minLength, `${minLength} minimum length `)
            if (maxLength)
                tempSchema = tempSchema.refine((val) => val.length < maxLength, `${maxLength} maximum length `)

            if (required)
                tempSchema = tempSchema.refine((val) => val.length >= 1, `This Field is required`)
            break;
        case 'email':
            tempSchema = z.string().email()
            break
        case 'number':
            tempSchema = z.number()
            if (minLength)
                // tempSchema = tempSchema.(minLength, `${minLength} minimum length required`)
                tempSchema = tempSchema.refine((val) => `${val}`.length >= minLength, `${minLength} minimum length `)
            if (maxLength)
                tempSchema = tempSchema.refine((val) => `${val}`.length < maxLength, `${maxLength} maximum length `)

            if (required)
                tempSchema = tempSchema.refine((val) => `${val}`.length >= 1, `This Field is required`)

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
    //     case "file":

    //         tempSchema = z
    //             .any()
    //             .refine((files) => files?.length == 1, 'file is required')
    //             .refine((files) => {console.log(files?.[0]?.type); return(fileType&& fileType.includes(files?.[0]?.type))}), `file type is must be ${fileType?.join(',')}`
    // break
        default:
    tempSchema = z.any()
}
return tempSchema
}

const ZodSchemaGenerater = (fields: Field[]) => {
    let baseType: any = {}
    if (fields.length === 0) {
        return z.any()
    }
    fields.forEach((field) => {
        baseType[field.label] = getFieldSchema(field)
    })
    // console.log(z.o(baseType));
    return z.object(baseType)
}

export default ZodSchemaGenerater