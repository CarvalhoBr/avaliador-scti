import BaseClientQueue from "./BaseClientQueue";

export class ReportEmailQueue extends BaseClientQueue{
  public queueUrl(): string | undefined {
    return process.env.REPORT_EMAIL_QUEUE;
  }
}