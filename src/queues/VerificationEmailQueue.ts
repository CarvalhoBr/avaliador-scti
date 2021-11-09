import { SQS } from 'aws-sdk';
import BaseClientQueue from "./BaseClientQueue";

export default class VerificationEmailQueue extends BaseClientQueue{
  public queueUrl() {
    return process.env.VERIFICATION_EMAIL_QUEUE;
  }

  public async enqueue(message: any, options?: SQS.SendMessageRequest) {
    await super.enqueue(message, options);
  }
}