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
      <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Inquiry</title>
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
          .section {
            margin-bottom: 24px;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 16px;
          }
          .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .section-title {
            color: #4f46e5;
            font-size: 18px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 16px;
          }
          .field {
            margin-bottom: 12px;
          }
          .field-label {
            font-weight: 600;
            color: #555;
            display: block;
            margin-bottom: 4px;
          }
          .field-value {
            margin: 0;
          }
          .description {
            background-color: #f5f7ff;
            padding: 16px;
            border-radius: 6px;
            border-left: 4px solid #4f46e5;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 16px 24px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .badge {
            display: inline-block;
            background-color: #e0e7ff;
            color: #4f46e5;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
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
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Project Inquiry</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <h2 class="section-title">Project Details</h2>
              
              <div class="field">
                <span class="field-label">Project Name</span>
                <p class="field-value">${projectName}</p>
              </div>
              
              ${projectType
            ? `
              <div class="field">
                <span class="field-label">Project Type</span>
                <p class="field-value">${projectType}</p>
              </div>
              `
            : ""
        }
              
              <div class="field">
                <span class="field-label">Description</span>
                <div class="description">
                  <p class="field-value">${projectDescription.replace(/\n/g, "<br>")}</p>
                </div>
              </div>
              
              ${budget
            ? `
              <div class="field">
                <span class="field-label">Budget Range</span>
                <p class="field-value"><span class="badge">${budget}</span></p>
              </div>
              `
            : ""
        }
              
              ${timeline
            ? `
              <div class="field">
                <span class="field-label">Timeline</span>
                <p class="field-value">${timeline}</p>
              </div>
              `
            : ""
        }
            </div>
            
            <div class="section">
              <h2 class="section-title">Contact Information</h2>
              
              <div class="field">
                <span class="field-label">Name</span>
                <p class="field-value">${name}</p>
              </div>
              
              <div class="field">
                <span class="field-label">Email</span>
                <p class="field-value"><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></p>
              </div>
              
              ${company
            ? `
              <div class="field">
                <span class="field-label">Company</span>
                <p class="field-value">${company}</p>
              </div>
              `
            : ""
        }
              
              ${phone
            ? `
              <div class="field">
                <span class="field-label">Phone</span>
                <p class="field-value"><a href="tel:${phone}" style="color: #4f46e5;">${phone}</a></p>
              </div>
              `
            : ""
        }
              
              ${files.length
            ? `
              <div class="field">
                <span class="field-label">Files Attached</span>
                <p class="field-value">${files.length} file(s)</p>
              </div>
              `
            : ""
        }
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
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
