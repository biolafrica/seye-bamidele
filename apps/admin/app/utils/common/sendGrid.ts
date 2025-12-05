import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
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
  subscribers: Array<{ email: string; name?: string }>,
  subject: string,
  html: string
) {
  try {
    const messages = subscribers.map(subscriber => ({
      to: subscriber.email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject,
      html,
      text: html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    }));

    await sgMail.send(messages);
    return { success: true, sent: messages.length };
  } catch (error: any) {
    console.error('SendGrid Bulk Error:', error.response?.body || error);
    return { success: false, error: error.message };
  }
}