import Joi from "joi";
import { speakerSchema } from "./speaker";

export const workshopCreate = () => Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  speakerId: Joi.number(),
  speaker: speakerSchema(),
}).or("speakerId", "speaker");


export const workshopRate = () => Joi.object({
  rate: Joi.number().min(0).max(10).required()
});