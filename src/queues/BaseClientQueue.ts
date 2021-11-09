import { SQS } from 'aws-sdk';

export default abstract class BaseClientQueue {
  private readonly sqs: SQS;

  public constructor() {
    this.sqs = new SQS({});
  }

  public async enqueue(msg: any, options?: SQS.SendMessageRequest) {
    const defaultOptions: SQS.SendMessageRequest = {
      MessageBody: JSON.stringify(msg),
      QueueUrl: this.queueUrl() || '',
    };

    Object.assign(defaultOptions, options);

    await this.sqs.sendMessage(defaultOptions).promise();
  }

  public abstract queueUrl(): string | undefined;
}