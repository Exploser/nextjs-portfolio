import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";

interface EmailRequestBody {
  email: string;
  subject: string;
  message: string;
}

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY in environment variables.");
}

if (!fromEmail) {
  throw new Error("Missing FROM_EMAIL in environment variables.");
}

const resend = new Resend(resendApiKey);

export async function POST(req: NextRequest) {
  const { email, subject, message }: EmailRequestBody = await req.json();
  console.log(email, subject, message);

  const htmlContent = `
    <h1>${subject}</h1>
    <p>Thank you for contacting us!</p>
    <p>New message submitted:</p>
    <p>${message}</p>
  `;

  try {
    if (!email || !fromEmail) {
      throw new Error("Missing email in request body.");
    }
    const data = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    // Ensure a proper JSON response in case of error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: "Unknown error"});
  }
}
