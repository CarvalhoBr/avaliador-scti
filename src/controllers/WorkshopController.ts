import { APIGatewayEvent, Context } from "aws-lambda";
import SpeakerRepository from "../repositories/SpeakerRepository";
import WorkshopRepository from "../repositories/WorkshopRepository";
import validator from "../validators";
import { workshopCreate } from "../validators/schemas/workshop";

export default class WorkshopController {
  private workshopRepository: WorkshopRepository;

  constructor(
    workshopRepository: WorkshopRepository,
  ) {
    this.workshopRepository = workshopRepository;
    this.create = this.create.bind(this);
  }

  static getInstance(): WorkshopController {
    return new WorkshopController(
      WorkshopRepository.getInstance(),
    );
  }

  async create(event: APIGatewayEvent, context: Context, callback: any) {
    try {
      console.log(`BODY: ${event.body}`);
      const body = validator(
        JSON.parse(event.body as string),
        workshopCreate()
      );

      let workshop;
      if (body.speaker) {
        workshop = await this.workshopRepository.createWithSpeaker(body);
      }else{
        workshop = await this.workshopRepository.create(body);
      }

      callback(null, {
        statusCode: 201,
        body: JSON.stringify(workshop),
      });
    } catch (error: any) {
      console.log(error);
      callback(null, {
        statusCode: 400,
        body: String(error),
      })
    }
  }
}
