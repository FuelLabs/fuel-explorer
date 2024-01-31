import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const handlebarOptions = {
  viewEngine: {
    partialDirs: path.resolve('./src/views/'),
    defaultLayout: false as unknown as string, // false is a valid express-handlebars type, but somehow nodemailer-express-handlebars only accepts string
  },
  viewPath: path.resolve('./src/views/'),
};

export default class MailService {
  private transporter?: nodemailer.Transporter;

  private static instance: MailService;

  private constructor() {}

  static async getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    if (!MailService.instance.transporter) {
      await MailService.instance.createConnection();
    }
    return MailService.instance;
  }

  async createConnection() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    this.transporter.use('compile', hbs(handlebarOptions));
  }

  async sendMail(
    options: {
      from?: string;
      to: string;
      subject: string;
    },
    context: {
      address: string;
      transactionId: string;
      completeWithdrawLink: string;
    }
  ) {
    const mailOptions = {
      from: options.from,
      to: options.to,
      template: 'email',
      subject: options.subject,
      context,
    };
    const info = await this.transporter?.sendMail(mailOptions);
    console.log(`ethereal url: ${nodemailer.getTestMessageUrl(info)}`);
    return info;
  }
}
