import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async handleContactForm(
    @Body() body: { name: string; email: string; message: string },
  ) {
    const { name, email, message } = body;
    const subject = `New message from ${name} (${email})`;
    const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    try {
      await this.mailService.sendMail(
        'gabriela.bilanzic@gmail.com',
        subject,
        text,
      );
      return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, message: 'Failed to send message.' };
    }
  }
}
