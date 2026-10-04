// lib/brevo.ts
interface SendEmailOptions {
  to: string;
  subject: string;
  htmlContent?: string;
}

export async function sendEmail({
  to,
  subject,
  htmlContent,
}: SendEmailOptions) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "App";

  if (!apiKey || !senderEmail) {
    throw new Error("Missing Brevo environment variables");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send email via Brevo");
  }

  return await response.json();
}
