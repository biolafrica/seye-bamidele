
import { baseEmailTemplate } from '@/lib/email_template';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface Subscriber {
  id?: string;
  email: string;
  name?: string;
  unsubscribe_token?: string;
}

export async function sendTrackedNewsletter(
  subscribers: Subscriber[],
  subject: string,
  content: string,
  newsletterId: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    console.log('Base URL for links:', baseUrl);

    const messages = subscribers.map(subscriber => {
      // Generate unsubscribe link
      const unsubscribeLink = `${baseUrl}/api/unsubscribe?token=${subscriber.unsubscribe_token}`;

      // Add tracking pixel
      const trackingPixel = `<img src="${baseUrl}/api/track/open?nid=${newsletterId}&sid=${subscriber.id}" width="1" height="1" style="display:none;" />`;

      // Wrap links for click tracking
      let trackedContent = content.replace(
        /<a\s+href="([^"]+)"/gi,
        (_, url) => {
          const trackedUrl = `${baseUrl}/api/track/click?nid=${newsletterId}&sid=${subscriber.id}&url=${encodeURIComponent(url)}`;
          return `<a href="${trackedUrl}"`;
        }
      );
      console.log('Tracked content for subscriber', subscriber.email, ':', trackedContent);

      // Wrap content in template with unsubscribe link
      const htmlContent = baseEmailTemplate(trackedContent, unsubscribeLink, subscriber.name);

      // Add tracking pixel at the end
      const finalHtml = htmlContent.replace('</body>', `${trackingPixel}</body>`);

      return {
        to: subscriber.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject,
        html: finalHtml,
      };
    });

    await sgMail.send(messages);
    return { success: true, sent: messages.length };
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error);
    return { success: false, error: error.message };
  }
}