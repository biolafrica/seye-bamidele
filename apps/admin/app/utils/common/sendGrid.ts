import { baseEmailTemplate } from '@/lib/email_template';
import sgMail from '@sendgrid/mail';


sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

interface Subscriber {
  id?: string;
  email: string;
  name?: string;
  unsubscribe_token?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject,
      text: text || '',
      html: html || text || '',
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error);
    return { success: false, error: error.message };
  }
}

export async function sendBulkEmail(
  subscribers: Subscriber[],
  subject: string,
  content: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const messages = subscribers.map(subscriber => {
      // Generate unsubscribe link
      const unsubscribeLink = `${baseUrl}/api/unsubscribe?token=${subscriber.unsubscribe_token}`;

      // Wrap content in beautiful template with unsubscribe link
      const htmlContent = baseEmailTemplate(content, unsubscribeLink, subscriber.name);

      // Create plain text version (strip HTML tags)
      const textContent = content.replace(/<[^>]*>/g, '');

      return {
        to: subscriber.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject,
        html: htmlContent,
        text: textContent,
      };
    });

    await sgMail.send(messages);
    return { success: true, sent: messages.length };
  } catch (error: any) {
    console.error('SendGrid Bulk Error:', error.response?.body || error);
    return { success: false, error: error.message };
  }
}