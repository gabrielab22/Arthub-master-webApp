import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, pdfPath?: string) {
    const mailOptions: any = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
    };

    if (pdfPath) {
      mailOptions.attachments = [
        {
          filename: 'invoice.pdf',
          path: pdfPath,
          contentType: 'application/pdf',
        },
      ];
    }

    try {
      const info = await this.transporter.sendMail(mailOptions);

      if (pdfPath) {
        fs.unlinkSync(pdfPath);
      }

      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendEmailWithPDF(
    to: string,
    subject: string,
    text: string,
    cartItems: any[],
    userEmail: string,
  ) {
    try {
      const htmlContent = this.generateHTML(cartItems, userEmail);
      const pdfFilePath = await this.generatePDF(htmlContent);

      const info = await this.sendMail(to, subject, text, pdfFilePath);

      return info;
    } catch (error) {
      console.error('Error sending email with PDF:', error);
      throw error;
    }
  }

  async generatePDF(htmlContent: string): Promise<string> {
    const pdfFilePath = path.join(__dirname, '..', 'temp', 'invoice.pdf');

    await new Promise<void>((resolve, reject) => {
      pdf.create(htmlContent).toFile(pdfFilePath, (err, res) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return pdfFilePath;
  }

  generateHTML(cartItems: any[], userEmail: string): string {
    let totalPrice = 0;
    const itemsHTML = cartItems
      .map((item) => {
        const product = item.product;
        const subtotal = product.price * item.quantity;
        totalPrice += subtotal;
        return `
        <tr>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${item.quantity}</td>
          <td>${product.price}</td>
          <td>${subtotal}</td>
        </tr>
      `;
      })
      .join('');

    return `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h2>Invoice</h2>
          <p>User Email: ${userEmail}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4"><strong>Total</strong></td>
                <td>${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `;
  }
}
