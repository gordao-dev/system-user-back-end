import { Joi } from "celebrate";
import { ObjectSchema, PartialSchemaMap, StringSchema } from "joi";

const textRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

export const OptionalTextString = Joi.string().regex(textRegex).lowercase();
export const RequiredTextString = OptionalTextString.required();

export const OptionalAnyString = Joi.string().lowercase();
export const RequiredAnyString = OptionalAnyString.required();

export const OptionalEmail = Joi.string().lowercase();
export const RequiredEmail = OptionalEmail.required();

export const OptionalNumber = Joi.string().lowercase();
export const RequiredNumber = OptionalNumber.required();
