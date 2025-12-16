import { baseEmailTemplate } from '@/lib/email_template';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface Subscriber {
  id: string; // Made required - fix your database query to always include this
  email: string;
  name?: string;
  unsubscribe_token: string;
}

/**
 * Wraps all links in HTML content with tracking URLs
 */
function wrapLinksWithTracking(
  htmlContent: string,
  baseUrl: string,
  newsletterId: string,
  subscriberId: string
): string {
  // More comprehensive regex that matches:
  // - Both single and double quotes
  // - Links with other attributes before href
  // - Various spacing
  const linkRegex = /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>/gi;
  
  return htmlContent.replace(linkRegex, (match, beforeHref, url, afterHref) => {
    // Skip if already a tracking link
    if (url.includes('/api/track/click') || url.includes('/api/unsubscribe')) {
      return match;
    }
    
    // Skip mailto, tel, and anchor links
    if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) {
      return match;
    }
    
    // Create tracking URL
    const encodedUrl = encodeURIComponent(url);
    const trackingUrl = `${baseUrl}/api/track/click?nid=${newsletterId}&sid=${subscriberId}&url=${encodedUrl}`;
    
    // Reconstruct the <a> tag with tracking URL
    return `<a ${beforeHref}href="${trackingUrl}"${afterHref}>`;
  });
}

/**
 * Adds tracking pixel to HTML content
 */
function addTrackingPixel(
  htmlContent: string,
  baseUrl: string,
  newsletterId: string,
  subscriberId: string
): string {
  const trackingPixel = `<img src="${baseUrl}/api/track/open?nid=${newsletterId}&sid=${subscriberId}" width="1" height="1" alt="" style="display:block;border:0;" />`;
  
  // Try to add before closing </body> tag
  let finalHtml = htmlContent;
  if (htmlContent.includes('</body>')) {
    return finalHtml = htmlContent.replace('</body>', `${trackingPixel}</body>`);
  } else {
    return finalHtml = htmlContent + trackingPixel;
  }
}

export async function sendTrackedNewsletter(
  subscribers: Subscriber[],
  subject: string,
  content: string,
  newsletterId: string
) {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://admin.bukah.co';

    if (baseUrl?.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    
    console.log('=== Starting Newsletter Send ===');
    console.log('Base URL:', baseUrl);
    console.log('Newsletter ID:', newsletterId);
    console.log('Subscribers count:', subscribers.length);

    // Validate that all subscribers have IDs
    const invalidSubscribers = subscribers.filter(s => !s.id);
    if (invalidSubscribers.length > 0) {
      console.error('ERROR: Some subscribers missing IDs:', invalidSubscribers);
      throw new Error(`${invalidSubscribers.length} subscribers are missing IDs`);
    }

    const messages = subscribers.map(subscriber => {
      // Generate unsubscribe link
      const unsubscribeLink = `${baseUrl}/api/unsubscribe?token=${subscriber.unsubscribe_token}`;
      
      // Wrap links with tracking
      let trackedContent = wrapLinksWithTracking(
        content,
        baseUrl,
        newsletterId,
        subscriber.id
      );
      
      // Generate full HTML from template
      const htmlContent = baseEmailTemplate(
        trackedContent,
        unsubscribeLink,
        subscriber.name
      );
      
      // Add tracking pixel
      const finalHtml = addTrackingPixel(
        htmlContent,
        baseUrl,
        newsletterId,
        subscriber.id
      );

      // Log tracking URLs for debugging (first subscriber only)
      if (subscriber === subscribers[0]) {
        console.log('=== Sample Tracking URLs (first subscriber) ===');
        console.log('Open tracking:', `${baseUrl}/api/track/open?nid=${newsletterId}&sid=${subscriber.id}`);
        
        // Find first tracked link
        const linkMatch = finalHtml.match(/api\/track\/click\?[^"]+/);
        if (linkMatch) {
          console.log('Click tracking sample:', linkMatch[0]);
        }
        console.log('Has tracking pixel:', finalHtml.includes('api/track/open'));
      }

      return {
        to: subscriber.email,
        from: {
          email: process.env.SENDGRID_FROM_EMAIL!,
          name: 'Seye Bandele Newsletter'
        },
        subject,
        html: finalHtml,
        // CRITICAL: Disable SendGrid's built-in tracking
        trackingSettings: {
          clickTracking: { enable: false },
          openTracking: { enable: false },
        },
        // Optional: Add custom args for SendGrid webhook
        customArgs: {
          newsletter_id: newsletterId,
        }
      };
    });

    console.log('Sending to SendGrid...');
    await sgMail.send(messages);
    
    console.log('✅ Newsletter sent successfully to', messages.length, 'subscribers');
    return { success: true, sent: messages.length };
    
  } catch (error: any) {
    console.error('❌ SendGrid Error:', error.response?.body || error);
    return { 
      success: false, 
      error: error.message,
      details: error.response?.body 
    };
  }
}