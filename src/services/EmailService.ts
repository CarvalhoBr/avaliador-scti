import nodemailer from 'nodemailer';
import ApiException from '../exceptions/ApiException';
import ConsumerException from '../exceptions/ConsumerException';

export default class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(message: nodemailer.SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(message);
    } catch (error) {
      throw new ConsumerException(`Erro ao enviar email: ${JSON.stringify(error)}`)
    }
  }
}