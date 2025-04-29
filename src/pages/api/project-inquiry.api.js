import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * POST /api/project-inquiry
 * Expects:
 * {
 *   name, email, projectName, projectType, projectDescription,
 *   budget, timeline, company, phone, files: [{ name, size, type }]
 * }
 */
export async function POST(req) {
    try {
        const body = await req.json();
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
        } = body || {};

        if (!name || !email || !projectName || !projectDescription) {
            return new Response(
                JSON.stringify({ message: "Missing required fields", success: false }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const subject = `New Project Inquiry from ${name}: ${projectName}`;
        const html = `
      <h2>New Project Inquiry</h2>

      <h3>Project Details</h3>
      <p><strong>Project Name:</strong> ${projectName}</p>
      <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
      <p><strong>Description:</strong></p>
      <p>${projectDescription.replace(/\n/g, "<br>")}</p>
      <p><strong>Budget Range:</strong> ${budget || "Not specified"}</p>
      <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>

      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

      ${files.length
                ? `<p><strong>Files Attached:</strong> ${files.length} file(s)</p>`
                : ""
            }
    `;

        const msg = {
            to: process.env.RECIPIENT_EMAIL,
            from: process.env.SENDER_EMAIL,
            subject,
            html,
        };

        await sgMail.send(msg);

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error sending project inquiry:", error);
        return new Response(
            JSON.stringify({ message: "Failed to send project inquiry", success: false }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
export async function GET() {
    return new Response(
        JSON.stringify({ message: "Project Inquiry endpoint is running!", success: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}