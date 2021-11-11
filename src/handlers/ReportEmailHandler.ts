import { Context, SQSEvent } from "aws-lambda";
import EmailService from "../services/EmailService";
import * as emailTransform from '../transforms/emailTransform'

export default class ReportEmailHandler {

  constructor(private emailService: EmailService,) {
    this.handler = this.handler.bind(this);
  }

  static getInstance(): ReportEmailHandler{
    return new ReportEmailHandler(
      new EmailService()
    );
  }

  public async handler(event: SQSEvent, context: Context){
    const body = JSON.parse(event.Records[0].body);

    const email = emailTransform.ratingReport(body)

    try {

      await this.emailService.sendMail(email);

    } catch (error: any) {

      console.error(error)

      if(error.isRetryable){
        throw error
      }
    }
  }
}