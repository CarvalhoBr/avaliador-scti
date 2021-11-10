import { ScheduledEvent, Context } from "aws-lambda";
import { ReportEmailQueue } from "../queues/ReportEmailQueue";
import WorkshopRepository from "../repositories/WorkshopRepository";

export default class ReportHandler {

  static getInstance(){
    return new ReportHandler(
      WorkshopRepository.getInstance(),
      new ReportEmailQueue()
    )
  }

  constructor(
    private workshopRepository: WorkshopRepository,
    private reportEmailQueue: ReportEmailQueue
  ) {
    this.handler = this.handler.bind(this)
  }

  public async handler(event: ScheduledEvent, context: Context) {
    try {
      const workshops = await this.workshopRepository.getWorkshopWithRatings()

      if(!workshops || workshops.length === 0) {
        console.log('No workshops to report')
      }

      const promises = workshops?.map((workshop: any) => {
        return this.reportEmailQueue.enqueue(workshop)
      })

      await Promise.all(promises)
      return
    } catch (error) {
      throw error
    }
    
  }
}