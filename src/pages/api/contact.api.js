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
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
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
