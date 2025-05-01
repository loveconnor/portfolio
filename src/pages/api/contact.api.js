import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * POST /api/contact
 * Expects: { name, email, message }
 *
 * GET /api/contact
 * Returns a simple status check
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Contact API is up', success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields', success: false });
  }

  const subject = `New Contact Form Submission from ${name}`;
  const html = `
      <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4f46e5;
            color: white;
            padding: 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 24px;
          }
          .field {
            margin-bottom: 20px;
          }
          .field:last-child {
            margin-bottom: 0;
          }
          .field-label {
            font-weight: 600;
            color: #555;
            display: block;
            margin-bottom: 8px;
            font-size: 16px;
          }
          .field-value {
            margin: 0;
            color: #333;
          }
          .message-container {
            background-color: #f5f7ff;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #4f46e5;
            margin-top: 8px;
          }
          .message-text {
            margin: 0;
            line-height: 1.8;
          }
          .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eaeaea;
          }
          .contact-item {
            flex: 1;
            min-width: 200px;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 16px 24px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .email-link {
            color: #4f46e5;
            text-decoration: none;
          }
          .email-link:hover {
            text-decoration: underline;
          }
          .timestamp {
            color: #888;
            font-size: 14px;
            text-align: right;
            margin-top: 16px;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
              border-radius: 0;
            }
            .header {
              padding: 16px;
            }
            .content {
              padding: 16px;
            }
            .contact-item {
              flex: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          
          <div class="content">
            <div class="contact-info">
              <div class="contact-item">
                <div class="field">
                  <span class="field-label">Name</span>
                  <p class="field-value">${name}</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="field">
                  <span class="field-label">Email</span>
                  <p class="field-value">
                    <a href="mailto:${email}" class="email-link">${email}</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div class="field">
              <span class="field-label">Message</span>
              <div class="message-container">
                <p class="message-text">${message.replace(/\n/g, "<br>")}</p>
              </div>
            </div>
            
            <p class="timestamp">Received on ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from your contact form.</p>
            <p>You can reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const msg = {
    to: process.env.RECIPIENT_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    if (error.response) {
      console.error('SendGrid error body:', error.response.body);
    }
    return res.status(500).json({ message: 'Failed to send email', success: false });
  }
}
