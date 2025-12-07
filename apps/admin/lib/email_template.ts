export interface TemplateVariables {
  subscriberName?: string;
  unsubscribeLink: string;
  content: string;
  [key: string]: any;
}

export function baseEmailTemplate(content: string, unsubscribeLink: string, subscriberName?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f4f4;
      line-height: 1.6;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f4f4f4;
      padding: 20px 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
      color: #333333;
    }
    .content h1, .content h2, .content h3 {
      color: #2d3748;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .content p {
      margin: 16px 0;
      line-height: 1.8;
    }
    .content a {
      color: #667eea;
      text-decoration: none;
    }
    .content a:hover {
      text-decoration: underline;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #667eea;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #5568d3;
      text-decoration: none !important;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      margin: 8px 0;
      font-size: 14px;
      color: #718096;
    }
    .unsubscribe-link {
      color: #718096;
      text-decoration: none;
      font-size: 13px;
    }
    .unsubscribe-link:hover {
      color: #4a5568;
      text-decoration: underline;
    }
    .divider {
      height: 1px;
      background-color: #e2e8f0;
      margin: 30px 0;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        border-radius: 0;
      }
      .content {
        padding: 30px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="header">
        <h1>📧 Your Newsletter</h1>
      </div>
      
      <div class="content">
        ${subscriberName ? `<p>Hi ${subscriberName},</p>` : ''}
        ${content}
      </div>
      
      <div class="footer">
        <p>You're receiving this email because you subscribed to our newsletter.</p>
        <p>
          <a href="${unsubscribeLink}" class="unsubscribe-link">Unsubscribe from this list</a>
        </p>
        <div class="divider"></div>
        <p style="margin-top: 20px;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

