import Joi from "joi";
import { speakerSchema } from "./speaker";

export const workshopCreate = () => Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  speakerId: Joi.number(),
  speaker: speakerSchema(),
}).or("speakerId", "speaker");
