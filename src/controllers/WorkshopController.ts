import { APIGatewayEvent, Context } from "aws-lambda";
import VerificationEmailQueue from "../queues/VerificationEmailQueue";
import RatingsRepository from "../repositories/RatingsRepository";
import WorkshopRepository from "../repositories/WorkshopRepository";
import validator from "../validators";
import { workshopCreate, workshopRate } from "../validators/schemas/workshop";

export default class WorkshopController {

  constructor(
    private workshopRepository: WorkshopRepository,
    private verificationEmailQueue: VerificationEmailQueue,
    private ratingsRepository: RatingsRepository
  ) {
    this.create = this.create.bind(this);
    this.rate = this.rate.bind(this);
  }

  static getInstance(): WorkshopController {
    return new WorkshopController(
      WorkshopRepository.getInstance(),
      new VerificationEmailQueue(),
      new RatingsRepository()
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

  async rate(event: APIGatewayEvent, context: Context, callback: any) {
    try {
      const body = validator(
        JSON.parse(event.body as string),
        workshopRate()
      )
      const workshopId = event.pathParameters?.workshopId
  
      if(!workshopId){
        callback(null, {
          statusCode: 400,
          body: 'workshopId is required'
        })
      }
  
      const workshop = await this.workshopRepository.findById(Number(workshopId))
      const rate = await this.ratingsRepository.create({
        workshopId: workshop.id,
        rating: body.rate
      } as any)
  
      return callback(null, {
        statusCode: 204,
        body: JSON.stringify(rate)
      })
    } catch (error: any) {
      callback(null, {
        statusCode: error.status || 500,
        body: String(error.message) || ""
      })
    }
  }
}
