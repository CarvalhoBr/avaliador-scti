import { APIGatewayEvent, Context } from "aws-lambda";
import VerificationEmailQueue from "../queues/VerificationEmailQueue";
import WorkshopRepository from "../repositories/WorkshopRepository";
import validator from "../validators";
import { workshopCreate } from "../validators/schemas/workshop";

export default class WorkshopController {
  private workshopRepository: WorkshopRepository;
  private verificationEmailQueue: VerificationEmailQueue;

  constructor(
    workshopRepository: WorkshopRepository,
    verificationEmailQueue: VerificationEmailQueue
  ) {
    this.workshopRepository = workshopRepository;
    this.verificationEmailQueue = verificationEmailQueue;
    this.create = this.create.bind(this);
  }

  static getInstance(): WorkshopController {
    return new WorkshopController(
      WorkshopRepository.getInstance(),
      new VerificationEmailQueue()
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

      await this.verificationEmailQueue.enqueue(workshop);

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
