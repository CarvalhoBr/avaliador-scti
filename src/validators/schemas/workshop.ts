import Joi from "joi";

export const workshopCreate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  speakerId: Joi.number().required(),
})
