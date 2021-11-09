import Joi from "joi";

export const speakerSchema = () => Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
})