import { APIGatewayEvent, Context } from "aws-lambda";
import { Workshop } from "../models/Workshop";
import validator from "../validators";
import { workshopCreate } from "../validators/schemas/workshop";

export default class WorkshopController {
  static getInstance(): WorkshopController {
    return new WorkshopController();
  }

  async create(event: APIGatewayEvent, context: Context, callback: any) {
    try {
      console.log(`BODY: ${event.body}`)
      const body = validator(JSON.parse(event.body as string), workshopCreate);

      const workshop = await Workshop.create(body);
      await workshop.save();

      callback(null, {
        statusCode: 201,
        body: JSON.stringify(workshop),
      });
    } catch (error: any) {
      console.error(error);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({error: JSON.parse(error.message)}),
      })
    }
  }
}
