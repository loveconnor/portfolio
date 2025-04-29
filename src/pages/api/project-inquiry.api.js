import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * POST /api/project-inquiry
 * Expects: { name, email, message }
 *
 * GET /api/project-inquiry
 * Returns a simple status check
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Project Inquiry API is up', success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    name,
    email,
    projectName,
    projectType,
    projectDescription,
    budget,
    timeline,
    company,
    phone,
    files = [],
  } = req.body || {};

  if (
    !name ||
    !email ||
    !projectName ||
    !projectType ||
    !projectDescription ||
    !budget ||
    !timeline
  ) {
    return res.status(400).json({ message: 'Missing required fields', success: false });
  }

  const subject = `New Project Inquiry from ${name}: ${projectName}`;
  const html = `
      <h2>New Project Inquiry</h2>

      <h3>Project Details</h3>
      <p><strong>Project Name:</strong> ${projectName}</p>
      <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
      <p><strong>Description:</strong></p>
      <p>${projectDescription.replace(/\n/g, '<br>')}</p>
      <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
      <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>

      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>

      ${
        files.length
          ? `<p><strong>Files Attached:</strong> ${files.length} file(s)</p>`
          : ''
      }
    `;
  console.log(files);
  const msg = {
    to: process.env.RECIPIENT_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject,
    html,
    attachments: files.map(file => ({
      content: file.content, // base64 string
      filename: file.name || 'File',
      type: file.type,
      disposition: 'attachment',
    })),
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
