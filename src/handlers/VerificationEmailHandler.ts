import { Context, SQSEvent } from "aws-lambda";
import Speaker from "../models/Speaker";
import EmailService from "../services/EmailService";
import * as emailTransform from "../transforms/emailTransform"

export default class VerificationEmailHandler {

  private emailService: EmailService

  constructor(emailService: EmailService) {
    this.emailService = emailService
    this.process = this.process.bind(this);
  }

  static getInstance() {
    return new VerificationEmailHandler(
      new EmailService()
    );
  }

  async process(event: SQSEvent, context: Context){
    try {
      const body = JSON.parse(event.Records[0].body);
      const speaker = await this.getSpeaker(body);

      const email = emailTransform.verificationEmail(body, speaker)

      await this.emailService.sendMail(email);
    } catch (error) {
      throw error
    }
    
  }

  async getSpeaker(body: any) {
    if (body.speaker){
      return body.speaker;
    }

    return await Speaker.findByPk(body.speakerId);
  }
}