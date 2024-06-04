import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ConfigService } from '@nestjs/config';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async handleContactForm(
    @Body() body: { name: string; email: string; message: string },
  ) {
    const { name, email, message } = body;
    const subject = `New message from ${name} (${email})`;
    const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    try {
      await this.contactService.sendMail(
        this.configService.get<string>('ADDRESS_SENDER'),
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
