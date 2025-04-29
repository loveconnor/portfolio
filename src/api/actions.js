"use server"

export async function sendContactEmail(formData) {
    try {
        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            return { success: false, message: "Missing required fields" };
        }

        // Dynamically import SendGrid only on the server
        const sgMail = (await import("@sendgrid/mail")).default;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const subject = `New Contact Form Submission from ${formData.name}`;
        const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message.replace(/\n/g, "<br>")}</p>
    `

        // Configure email options
        const msg = {
            to: process.env.RECIPIENT_EMAIL || "your-email@example.com",
            from: process.env.SENDER_EMAIL || "noreply@yourwebsite.com",
            subject: subject,
            html: emailContent,
        };

        // Send email
        await sgMail.send(msg);

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending contact email:", error);
        return { success: false, message: "Failed to send email", error: error.message };
    }
}

export async function sendProjectInquiry(formData, files) {
    try {
        // Validate required fields
        if (!formData.name || !formData.email || !formData.projectName || !formData.projectDescription) {
            return { success: false, message: "Missing required fields" };
        }

        // Dynamically import SendGrid only on the server
        const sgMail = (await import("@sendgrid/mail")).default;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const subject = `New Project Inquiry from ${formData.name}: ${formData.projectName}`;
        const emailContent = `
      <h2>New Project Inquiry</h2>
      <h3>Project Details</h3>
      <p><strong>Project Name:</strong> ${formData.projectName}</p>
      <p><strong>Project Type:</strong> ${formData.projectType}</p>
      <p><strong>Description:</strong></p>
      <p>${formData.projectDescription.replace(/\n/g, "<br>")}</p>
      <p><strong>Budget Range:</strong> ${formData.budget}</p>
      <p><strong>Timeline:</strong> ${formData.timeline}</p>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company || "Not provided"}</p>
      <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
      
      ${files && files.length > 0 ? `<p><strong>Files Attached:</strong> ${files.length} file(s)</p>` : ""}
    `

        // Configure email options
        const msg = {
            to: process.env.RECIPIENT_EMAIL || "your-email@example.com",
            from: process.env.SENDER_EMAIL || "noreply@yourwebsite.com",
            subject: subject,
            html: emailContent,
        };

        // Send email
        await sgMail.send(msg);

        return { success: true, message: "Project inquiry sent successfully" };
    } catch (error) {
        console.error("Error sending project inquiry:", error);
        return { success: false, message: "Failed to send project inquiry", error: error.message };
    }
}
