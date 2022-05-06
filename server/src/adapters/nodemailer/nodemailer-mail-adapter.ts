import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "95c57de010e87f",
    pass: "1c5846e018aa7c"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Rafael Heros de Almeida <rafaelheros80@gmail.com>',
      subject,
      html : body,
    });
  };
}